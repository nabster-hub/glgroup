import { supabase } from "@/lib/supabaseClient";
import ExchangeDashboardBank from "./ExchangeDashboardBank";
import { getCurrencies } from "@/lib/api";
import { headers } from "next/headers";

export default async function ExchangeDashboardBankServer({ blok }) {
    const locale = headers().get("x-next-intl-locale") || "en";

    /* === 1. Дані з Supabase (exchange_rates) === */
    const { data: ratesData, error } = await supabase
        .from("exchange_rates")
        .select("*")
        .gt("buy", 0)
        .gt("sell", 0)
        .order("timestamp", { ascending: false });
    if (error) console.error("Supabase error:", error);

    /* === 2. Нормалізація валют (CNH / RMB → CNY) === */
    const normalizeRates = (rates) =>
        (rates || []).map((rate) => ({
            ...rate,
            currency:
                rate.currency === "CNH" || rate.currency === "RMB"
                    ? "CNY"
                    : rate.currency,
        }));

    const normalizedRatesData = normalizeRates(ratesData);

    /* === 3. Дані про валюти з API === */
    const currenciesResponse = await getCurrencies(locale);
    const currenciesData = currenciesResponse?.data?.datasource_entries || [];

    const currenciesMap = Object.fromEntries(
        currenciesData.map((c) => [c.name, c.dimension_value || c.value])
    );

    const currenciesList = currenciesData.map((c) => c.name);

    /* === 4. Дані про банки зі Storyblok === */
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

    /* === 5. Фільтрація по доступних банках === */
    const filterAvailableBanks = (rates) =>
        rates.filter((rate) => banksMap[rate.bank]?.available);

    const filteredRatesData = filterAvailableBanks(normalizedRatesData);

    /* === 6. Передаємо все у клієнтський компонент === */
    return (
        <ExchangeDashboardBank
            blok={blok}
            rates={filteredRatesData}
            currenciesMap={currenciesMap}
            currenciesList={currenciesList}
            banksMap={banksMap}
            locale={locale}
        />
    );
}
