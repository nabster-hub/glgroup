'use client';
import BestOfferForEachCurrency from "@/components/bestOfferForEachCurrency/BestOfferForEachCurrency";
import Converter from "@/components/Converter/Converter";
import BestOfferForEachBank from "@/components/bestOfferForEachBank/BestOfferForEachBank";

export default function ExchangeDashboardMain({ blok, rates, ratesBI, currenciesMap, currenciesList, banksMap, locale }) {
    return (
        <div>
            <BestOfferForEachCurrency blok={blok.BestExchangeForEachCurrency?.[0]} initialRates={rates} ratesBI={ratesBI} currenciesMap={currenciesMap} banksMap={banksMap} locale={locale} />
            <Converter
                blok={blok.Converter?.[0]}
                rates={rates}
                ratesBI={ratesBI}
                banksMap={banksMap}
                currenciesMap={currenciesMap}
            />
            <BestOfferForEachBank blok={blok.BestExchangeForEachBank?.[0]} rates={rates} currenciesMap={currenciesMap} currenciesList={currenciesList} banksMap={banksMap} locale={locale} />
        </div>
    );
}