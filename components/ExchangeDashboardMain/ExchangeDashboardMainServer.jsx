import { supabase } from "@/lib/supabaseClient";
import ExchangeDashboardMain from "./ExchangeDashboardMain";
import { getCurrencies } from "@/lib/api";
import { headers } from "next/headers";

export default async function ExchangeDashboardMainServer({ blok }) {
    const locale = headers().get("x-next-intl-locale") || "en";

    const { data } = await supabase
        .from("exchange_rates")
        .select("timestamp")
        .gt("buy", 0)
        .gt("sell", 0)
        .order("timestamp", { ascending: false });

    const availableDates = [...new Set(
        data?.map(row => {
            const d = new Date(row.timestamp);
            return isNaN(d.getTime()) ? null : d.toISOString().split("T")[0];
        }).filter(Boolean) || []
    )].sort((a, b) => b.localeCompare(a));
    /* === 1. Дані з Supabase (exchange_rates) === */
    const { data: ratesData, error } = await supabase
        .from('exchange_rates_latest')
        .select('*')
        .order('currency');
    if (error) console.error("Supabase error:", error);

    /* === 2. Дані з Supabase (exchange_rates_bi) === */
    const { data: ratesBIData, error: errorBI } = await supabase
        .from("exchange_rates_bi_latest")
        .select("currency, buy, sell");
    if (errorBI) console.error("Supabase BI error:", errorBI);

    /* === 3. Нормалізація валют (CNH / RMB → CNY) === */
    const normalizeRates = (rates) =>
        (rates || []).map((rate) => ({
            ...rate,
            currency:
                rate.currency === "CNH" || rate.currency === "RMB"
                    ? "CNY"
                    : rate.currency,
        }));
    const normalizeRatesBi = (rates) => {
        if (!rates || !Array.isArray(rates)) return [];

        const result = [];
        const seen = new Map();

        for (const rate of rates) {
            let currency = rate.currency;
            if (currency === 'CNH' || currency === 'RMB') {
                currency = 'CNY';
            }

            const current = seen.get(currency);
            if (!current) {
                seen.set(currency, { ...rate, currency });
                continue;
            }
            if (currency === 'CNY') {
                const newRate = rate.buy > 0 && rate.sell > 0 ? rate : null;
                const currRate = current.buy > 0 && current.sell > 0 ? current : null;
                const currentSource = current.originalCurrency || 'CNY';
                const newSource = rate.currency;

                let shouldReplace = false;

                if (!currRate && newRate) {
                    shouldReplace = true;
                } else if (newRate && currRate) {
                    if (newSource === 'CNY' && currentSource !== 'CNY') {
                        shouldReplace = true;
                    } else if (newSource === 'CNH' && currentSource === 'RMB') {
                        shouldReplace = true;
                    }
                }

                if (shouldReplace) {
                    seen.set(currency, { ...rate, currency, originalCurrency: rate.currency });
                }
            }
            else {
                seen.set(currency, { ...rate, currency });
            }
        }
        const ordered = [];
        for (const rate of rates) {
            const normCurrency = (rate.currency === 'CNH' || rate.currency === 'RMB') ? 'CNY' : rate.currency;
            if (seen.has(normCurrency) && !ordered.some(r => r.currency === normCurrency)) {
                ordered.push(seen.get(normCurrency));
            }
        }
        for (const [currency, rate] of seen) {
            if (!ordered.some(r => r.currency === currency)) {
                ordered.push(rate);
            }
        }

        return ordered;
    };
    const normalizedRatesData = normalizeRates(ratesData);
    const normalizedRatesBIData = normalizeRatesBi(ratesBIData);
    /* === 4. Дані про валюти з API === */
    const currenciesResponse = await getCurrencies(locale);
    const currenciesData = currenciesResponse?.data?.datasource_entries || [];

    const currenciesMap = Object.fromEntries(
        currenciesData.map((c) => [c.name, c.dimension_value || c.value])
    );

    const currenciesList = currenciesData.map((c) => c.name);

    /* === 5. Дані про банки зі Storyblok === */
    const bankList = blok.BankList?.[0]?.banks || [];
    const banksMap = Object.fromEntries(
        bankList.map((b) => [
            b.id,
            {
                name: b.name,
                logo: b.logo?.filename || "",
                url: b.url?.cached_url || "",
                available: b.available ?? false,
            },
        ])
    );

    /* === 6. Фільтрація по доступних банках === */
    const filterAvailableBanks = (rates) =>
        rates.filter((rate) => banksMap[rate.bank]?.available);

    const filteredRatesData = filterAvailableBanks(normalizedRatesData);
    const filteredRatesBIData = normalizedRatesBIData;
    /* === 7. Передаємо все у клієнтський компонент === */
    return (
        <ExchangeDashboardMain
            blok={blok}
            availableDates={availableDates}
            rates={filteredRatesData}
            ratesBI={filteredRatesBIData}
            currenciesMap={currenciesMap}
            currenciesList={currenciesList}
            banksMap={banksMap}
            locale={locale}
        />
    );
}
