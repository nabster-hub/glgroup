"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./InfoByCurrency.module.scss";
import clsx from "clsx";
import { render } from "storyblok-rich-text-react-renderer";
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

// -----------------------------
// HELPERS
// -----------------------------
function formatDynamicText(rawText, locale, placeholders = {}, bolder = false) {
    if (!rawText) return "";
    let text = "";

    if (typeof rawText === "string") text = rawText;
    else if (Array.isArray(rawText) || typeof rawText === "object") {
        if (typeof rawText?.[locale] === "string") text = rawText[locale];
        else if (typeof rawText?.content === "string") text = rawText.content;
        else text = "";
    }

    Object.entries(placeholders).forEach(([key, value]) => {
        const replacement = value ?? "";
        const finalVal = bolder ? `<strong>${replacement}</strong>` : replacement;
        text = text.replace(new RegExp(`{${key}}`, "g"), finalVal);
    });

    return text;
}

function formatDateLongByLocale(dateInput = new Date(), locale = "ru", timeZone = "Asia/Jakarta") {
    const date = new Date(dateInput);
    const options = { timeZone, day: "2-digit", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat(locale, options).format(date);
}

function formatNumber(value) {
    if (typeof value !== "number" || isNaN(value)) return "-";
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// -----------------------------
// DROPDOWN COMPONENT
// -----------------------------
function Dropdown({ list, selected, setSelected, getLabel, getIcon }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button
                type="button"
                className={clsx(styles.dropdownButton, "flex items-center justify-between")}
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-2">
                    {getIcon && (
                        <div className={styles.circle}>
                            <img src={getIcon(selected)} alt={selected} className={styles.flag} />
                        </div>
                    )}
                    <span>{getLabel(selected)}</span>
                </div>

                <img
                    src="/img/icons/arrow-down.svg"
                    alt="arrow"
                    className={clsx(styles.arrow, open && styles.arrowOpen)}
                />
            </button>

            {open && (
                <div className={styles.dropdownListWrapper}>
                    <ul className={styles.dropdownList}>
                        {list.map((item) => (
                            <li
                                key={item}
                                className={clsx(styles.dropdownItem, item === selected && styles.active)}
                                onClick={() => {
                                    setSelected(item);
                                    setOpen(false);
                                }}
                            >
                                {getIcon && (
                                    <div className={styles.circle}>
                                        <img src={getIcon(item)} alt={item} className={styles.flag} />
                                    </div>
                                )}
                                <span>{getLabel(item)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// -----------------------------
// MAIN COMPONENT
// -----------------------------
const InfoByCurrency = ({ blok, rates = [], currenciesMap = {}, currenciesList = [], banksMap, locale, bankid }) => {
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [selectedPeriod, setSelectedPeriod] = useState("1w");
    const [showBuy, setShowBuy] = useState(true);
    const [showSell, setShowSell] = useState(true);

    const toggleBuy = () => { if (!(showBuy && !showSell)) setShowBuy(!showBuy); };
    const toggleSell = () => { if (!(showSell && !showBuy)) setShowSell(!showSell); };

    // -----------------------------
    // PERIOD DATES
    // -----------------------------
    const now = new Date();
    const startDate = useMemo(() => {
        switch (selectedPeriod) {
            case "1w": return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
            case "1m": return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            case "6m": return new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
            default: return new Date(0);
        }
    }, [selectedPeriod]);

    // -----------------------------
    // FIXED: CURRENCIES ONLY FOR THIS BANK
    // -----------------------------
    const availableCurrencies = useMemo(() => {
        const set = Array.from(
            new Set(
                rates.filter(r => r.bank === bankid).map(r => r.currency)
            )
        );

        return set.sort(
            (a, b) => currenciesList.indexOf(a) - currenciesList.indexOf(b)
        );
    }, [rates, bankid, currenciesList]);

    // Якщо поточна валюта не входить у доступні — ставимо першу
    useEffect(() => {
        if (!availableCurrencies.includes(selectedCurrency) && availableCurrencies.length > 0) {
            setSelectedCurrency(availableCurrencies[0]);
        }
    }, [availableCurrencies]);

    // -----------------------------
    // RATES FOR CHART
    // -----------------------------
    const ratesForSelected = useMemo(() => {
        return rates
            .filter(r => r.bank === bankid && r.currency === selectedCurrency && new Date(r.timestamp) >= startDate)
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }, [rates, bankid, selectedCurrency, startDate]);

    const chartData = ratesForSelected.map(r => ({
        date: r.timestamp,
        buy: r.buy,
        sell: r.sell
    }));

    const [minY, maxY] = useMemo(() => {
        const vals = [];
        if (showBuy) vals.push(...chartData.map(d => d.buy));
        if (showSell) vals.push(...chartData.map(d => d.sell));
        if (!vals.length) return [0, 0];
        const min = Math.min(...vals);
        const max = Math.max(...vals);
        const pad = (max - min) * 0.1;
        return [min - pad, max + pad];
    }, [chartData, showBuy, showSell]);

    // -----------------------------
    // PERIOD OPTIONS
    // -----------------------------
    const periodOptions = [
        { label: blok.oneweek?.[locale] || blok.oneweek, value: "1w" },
        { label: blok.onemonth?.[locale] || blok.onemonth, value: "1m" },
        { label: blok.sixmonth?.[locale] || blok.sixmonth, value: "6m" },
    ];

    // -----------------------------
    // TABLE DATA
    // -----------------------------
    const [sortField, setSortField] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [expanded, setExpanded] = useState(false);

    const filteredByOtherBanks = useMemo(() => {
        const latest = rates
            .filter(r => r.currency === selectedCurrency && r.bank !== bankid)
            .reduce((acc, r) => {
                if (!acc[r.bank] || new Date(r.timestamp) > new Date(acc[r.bank].timestamp)) {
                    acc[r.bank] = r;
                }
                return acc;
            }, {});

        let arr = Object.values(latest);

        if (sortField) {
            arr.sort((a, b) =>
                sortAsc ? a[sortField] - b[sortField] : b[sortField] - a[sortField]
            );
        }

        return arr;
    }, [rates, selectedCurrency, bankid, sortField, sortAsc]);

    const visibleData = expanded ? filteredByOtherBanks : filteredByOtherBanks.slice(0, 5);

    const latestForSelected = ratesForSelected[ratesForSelected.length - 1];
    const currencyBuy = latestForSelected ? formatNumber(latestForSelected.buy) : "-";
    const currencySell = latestForSelected ? formatNumber(latestForSelected.sell) : "-";
    const placeholders = {
        date: formatDateLongByLocale(latestForSelected?.timestamp, locale),
        currency: selectedCurrency,
        currency_buy: currencyBuy,
        currency_sell: currencySell,
        bank_name: banksMap[bankid]?.name,
    };

    const dynamicText = formatDynamicText(blok.description, locale, placeholders);
    const dynamicText1 = formatDynamicText(blok.title1, locale, placeholders, true);
    const dynamicText2 = formatDynamicText(blok.title2, locale, placeholders);

    const showMoreTextRaw =
        blok[expanded ? "showless" : "showmore"]?.[locale] ||
        blok[expanded ? "showless" : "showmore"];

    const showMoreText = formatDynamicText(showMoreTextRaw, locale, placeholders);

    const handleSort = (field) => {
        if (sortField === field) setSortAsc(!sortAsc);
        else {
            setSortField(field);
            setSortAsc(true);
        }
    };

    // -----------------------------
    // RENDER
    // -----------------------------
    return (
        <section className={clsx(styles.InfoByCurrency)} {...storyblokEditable(blok)}>
            <div className={clsx("container", styles.content)}>
                <div className={styles.description}>{render(dynamicText)}</div>

                <div className={styles.wrapperBlock}>
                    <div className={styles.chartTitle} dangerouslySetInnerHTML={{ __html: dynamicText1 }} />

                    <div className={styles.chartWrap}>
                        <div className={styles.controlsBlock}>

                            <div className={styles.chartSwitchers}>
                                <label className={clsx(styles.buttonSwapped, showBuy && styles.active)}>
                                    <input type="checkbox" checked={showBuy} onChange={toggleBuy} /> {blok.buying}
                                </label>

                                <label className={clsx(styles.buttonSwapped, showSell && styles.active)}>
                                    <input type="checkbox" checked={showSell} onChange={toggleSell} /> {blok.selling}
                                </label>
                            </div>

                            <div className={styles.chartFilters}>
                                <Dropdown
                                    list={periodOptions.map(p => p.value)}
                                    selected={selectedPeriod}
                                    setSelected={setSelectedPeriod}
                                    getLabel={(value) => periodOptions.find(p => p.value === value)?.label ?? value}
                                />

                                {/* FIXED CURRENCIES LIST */}
                                <Dropdown
                                    list={availableCurrencies}
                                    selected={selectedCurrency}
                                    setSelected={setSelectedCurrency}
                                    getLabel={cur => cur}
                                    getIcon={cur => `/img/flags/twemoji_flag-${cur}.svg`}
                                />
                            </div>
                        </div>

                        <div className={styles.chartBlock}>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData} margin={{ right: 20, left: 20 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        axisLine={false}
                                        dataKey="date"
                                        tickFormatter={(v) => {
                                            const d = new Date(v);
                                            return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`;
                                        }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        domain={[minY, maxY]}
                                        tickFormatter={(v) => v.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                    />
                                    <Tooltip
                                        formatter={(v) => v.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                        labelFormatter={(label) => {
                                            const d = new Date(label);
                                            return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`;
                                        }}
                                    />

                                    {showBuy && <Line type="monotone" dataKey="buy" stroke="#3FA822" strokeWidth={2} dot={false} />}
                                    {showSell && <Line type="monotone" dataKey="sell" stroke="#1a73e8" strokeWidth={2} dot={false} />}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className={styles.chartTitle2}>{render(dynamicText2)}</div>

                    {/* TABLE */}
                    <div className={styles.tableWrapper}>
                        <div className={styles.table}>
                            <div className={clsx(styles.row, styles.header)}>
                                <div>{render(blok.bank?.[locale] || blok.bank)}</div>

                                <div className={styles.sortable} onClick={() => handleSort("buy")}>
                                    {render(blok.buyrate?.[locale] || blok.buyrate)}
                                    <span className={styles.sortIcons}>
                                        {sortField === "buy"
                                            ? <img src={`/img/icons/${sortAsc ? "sortarrowup" : "sortarrowdown"}.svg`} />
                                            : <img src="/img/icons/sortarrow2.svg" />}
                                    </span>
                                </div>

                                <div className={styles.sortable} onClick={() => handleSort("sell")}>
                                    {render(blok.sellrate?.[locale] || blok.sellrate)}
                                    <span className={styles.sortIcons}>
                                        {sortField === "sell"
                                            ? <img src={`/img/icons/${sortAsc ? "sortarrowup" : "sortarrowdown"}.svg`} />
                                            : <img src="/img/icons/sortarrow2.svg" />}
                                    </span>
                                </div>
                            </div>

                            {visibleData.length > 0 ? (
                                visibleData.map((r, i) => (
                                    <div key={i} className={styles.row}>
                                        <div className={styles.bank}>
                                            <img src={banksMap[r.bank]?.logo} alt={banksMap[r.bank]?.name} className={styles.flag} />
                                            {banksMap[r.bank]?.name}
                                        </div>

                                        <div className={styles.buy}>
                                            <span className={styles.boldnumber}>{formatNumber(r.buy)}</span> IDR
                                        </div>

                                        <div className={styles.sell}>
                                            <span className={styles.boldnumber}>{formatNumber(r.sell)}</span> IDR
                                        </div>

                                        <div className={styles.wrapdetail}>
                                            <Link
                                                href={`${(banksMap[r.bank]?.url || "#").startsWith("/") ? "" : "/"}${banksMap[r.bank]?.url || "#"}`}
                                                passHref
                                                className={styles.detail}
                                            >
                                                {blok.details}
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noData}>No data for {selectedCurrency}</div>
                            )}
                        </div>
                    </div>

                    {filteredByOtherBanks.length > 5 && (
                        <div className={styles.buttonWrapper}>
                            <button className={styles.showMoreBtn} onClick={() => setExpanded(!expanded)}>
                                {render(showMoreText)}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default InfoByCurrency;
