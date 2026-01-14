'use client';
import BankExchangeList from "@/components/BankExchangeList/BankExchangeList";
import InfoByCurrency from "../InfoByCurrency/InfoByCurrency";


export default function ExchangeDashboardBank({ blok, rates, currenciesMap, currenciesList, banksMap, locale }) {
    const bankid = blok.BankExchangeList?.[0]?.bankid;
    return (
        <div>
            <BankExchangeList blok={blok.BankExchangeList?.[0]} initialRates={rates} currenciesMap={currenciesMap} currenciesList={currenciesList} banksMap={banksMap} locale={locale} />
            <InfoByCurrency blok={blok.InfoByCurrency?.[0]} rates={rates} currenciesMap={currenciesMap} currenciesList={currenciesList} banksMap={banksMap} locale={locale} bankid={bankid} />

        </div>
    );
}