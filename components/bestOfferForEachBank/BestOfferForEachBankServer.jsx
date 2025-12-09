import { supabase } from "@/lib/supabaseClient";
import BestOfferForEachBank from "./BestOfferForEachBank";
import { getCurrencies } from "@/lib/api";
import { headers } from "next/headers";

export default async function BestOfferForEachBankServer({ blok }) {
    const locale = headers().get("x-next-intl-locale") || "en";

    const { data: ratesData, error: ratesError } = await supabase
        .from("exchange_rates")
        .select("*")
        .gt("buy", 0)
        .gt("sell", 0)
        .order("timestamp", { ascending: false });

    if (ratesError || !ratesData) {
        console.error("❌ Supabase fetch error (exchange_rates):", ratesError?.message);
        return null;
    }

    const { data: biData, error: biError } = await supabase
        .from("exchange_rates_bi")
        .select("*")
        .order("timestamp", { ascending: false });

    if (biError || !biData) {
        console.error("❌ Supabase fetch error (exchange_rates_bi):", biError?.message);
    }

    const latestByBank = {};
    for (const row of ratesData) {
        if (row.buy === 0 || row.sell === 0) continue;
        const key = `${row.bank}_${row.currency}`;
        if (!latestByBank[key]) latestByBank[key] = row;
    }

    const grouped = {};
    Object.values(latestByBank).forEach((row) => {
        if (!grouped[row.currency]) grouped[row.currency] = [];
        grouped[row.currency].push(row);
    });

    const rates = Object.entries(grouped)
        .map(([currency, rates]) => {
            const validRates = rates.filter((r) => r.buy > 0 && r.sell > 0);
            if (validRates.length === 0) return null;

            const bestBuy = validRates.reduce((min, r) => (r.buy < min.buy ? r : min), validRates[0]);
            const bestSell = validRates.reduce((max, r) => (r.sell > max.sell ? r : max), validRates[0]);

            return {
                currency,
                best_buy: { rate: bestBuy.buy, bank: bestBuy.bank },
                best_sell: { rate: bestSell.sell, bank: bestSell.bank },
            };
        })
        .filter(Boolean);

    const currenciesResponse = await getCurrencies(locale);
    const currenciesData = currenciesResponse?.data?.datasource_entries || [];

    const currenciesMap = Object.fromEntries(
        currenciesData.map((c) => [c.name, c.dimension_value || c.value])
    );

    const ratesWithName = currenciesData
        .map((c) => {
            const rate = rates.find((r) => r.currency === c.name);
            if (!rate) return null;
            return {
                ...rate,
                name: c.dimension_value || c.value,
            };
        })
        .filter(Boolean);

    const currenciesList = currenciesData.map((c) => c.name);

    return (
        <BestOfferForEachBank
            blok={blok}
            initialRates={ratesWithName}
            biRates={biData || []}
            locale={locale}
            currenciesList={currenciesList}
            currenciesMap={currenciesMap}
        />
    );
}
