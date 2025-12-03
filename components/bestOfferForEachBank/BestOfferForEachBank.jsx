"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import styles from "./bestOfferForEachBank.module.scss";
import clsx from "clsx";
import { render } from "storyblok-rich-text-react-renderer";
import { storyblokEditable } from "@storyblok/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

function formatNumber(value) {
    if (typeof value !== "number" || isNaN(value)) return "-";
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatTimeByLocale(dateInput = new Date(), locale = "ru", updatedat, timeZone = "Asia/Jakarta") {
    const date = new Date(dateInput);
    const options = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };
    return `${updatedat} ${new Intl.DateTimeFormat(locale, options).format(date)}`;
}

function formatDateLongByLocale(dateInput = new Date(), locale = "ru", timeZone = "Asia/Jakarta") {
    const date = new Date(dateInput);
    const options = {
        timeZone,
        day: "2-digit",
        month: "long",
        year: "numeric",
    };
    return new Intl.DateTimeFormat(locale, options).format(date);
}

function CurrencyDropdown({ currenciesList, selectedCurrency, setSelectedCurrency }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
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
                    <div className={styles.circle}>
                        <img
                            src={`/img/flags/twemoji_flag-${selectedCurrency}.svg`}
                            alt={selectedCurrency}
                            className={styles.flag}
                        />
                    </div>
                    <span>{selectedCurrency}</span>
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
                        {currenciesList.map((cur) => (
                            <li
                                key={cur}
                                className={clsx(styles.dropdownItem, cur === selectedCurrency && styles.active)}
                                onClick={() => {
                                    setSelectedCurrency(cur);
                                    setOpen(false);
                                }}
                            >
                                <div className={styles.circle}>
                                    <img
                                        src={`/img/flags/twemoji_flag-${cur}.svg`}
                                        alt={cur}
                                        className={styles.flag}
                                    />
                                </div>
                                <span>{cur}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function formatDynamicText(rawText, locale, placeholders = {}) {
    if (!rawText) return "";

    let text = "";

    if (typeof rawText === "string") {
        text = rawText;
    } else if (Array.isArray(rawText) || typeof rawText === "object") {
        if (typeof rawText?.[locale] === "string") text = rawText[locale];
        else if (typeof rawText?.content === "string") text = rawText.content;
        else text = "";
    }

    Object.entries(placeholders).forEach(([key, value]) => {
        text = text.replace(new RegExp(`{${key}}`, "g"), value ?? "");
    });

    return text;
}

const BestOfferForEachBank = ({
                                  blok,
                                  rates = [],
                                  currenciesList = [],
                                  locale,
                                  currenciesMap = {},
                                  banksMap = {},
                              }) => {
    const [selectedCurrency, setSelectedCurrency] = useState("USD");

    const availableDates = useMemo(() => {
        return Array.from(
            new Set(
                rates
                    .filter((r) => r.currency === selectedCurrency)
                    .map((r) => new Date(r.timestamp).toISOString().split("T")[0])
            )
        ).map((d) => new Date(d));
    }, [rates, selectedCurrency]);

    const lastAvailableDate = useMemo(() => {
        if (availableDates.length === 0) return new Date();
        return availableDates.reduce((a, b) => (a > b ? a : b));
    }, [availableDates]);

    const [selectedDate, setSelectedDate] = useState(lastAvailableDate);
    useEffect(() => {
        setSelectedDate(lastAvailableDate);
    }, [lastAvailableDate]);

    const [visibleCount, setVisibleCount] = useState(5);
    const [sortField, setSortField] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);

    const selectedDateString = selectedDate.toISOString().split("T")[0];

    const filteredRates = rates.filter((r) => {
        const itemDate = new Date(r.timestamp).toISOString().split("T")[0];
        return r.currency === selectedCurrency && itemDate === selectedDateString && r.buy > 0 && r.sell > 0;
    });

    const latestByBank = Object.values(
        filteredRates.reduce((acc, r) => {
            if (!acc[r.bank] || new Date(r.timestamp) > new Date(acc[r.bank].timestamp)) {
                acc[r.bank] = r;
            }
            return acc;
        }, {})
    );

    const bestBuyRate = latestByBank.length ? Math.min(...latestByBank.map((r) => r.buy)) : 0;
    const bestSellRate = latestByBank.length ? Math.max(...latestByBank.map((r) => r.sell)) : 0;

    const bestBankBuy = banksMap[latestByBank.find((r) => r.buy === bestBuyRate)?.bank || "-"]?.name;
    const bestBankSell = banksMap[latestByBank.find((r) => r.sell === bestSellRate)?.bank || "-"]?.name;

    const sortedRates = [...latestByBank].sort((a, b) => {
        if (!sortField) return 0;
        return sortAsc ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
    });

    const visibleData = sortedRates.slice(0, visibleCount);
    const isExpanded = visibleCount >= sortedRates.length;

    const CustomInput = React.forwardRef(({ value, onClick }, ref) => {
        const today = new Date();
        const selected = new Date(value);
        const isToday =
            selected.getFullYear() === today.getFullYear() &&
            selected.getMonth() === today.getMonth() &&
            selected.getDate() === today.getDate();
        const displayValue = isToday
            ? blok.today
            : new Intl.DateTimeFormat(locale, {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }).format(selected);

        return (
            <button
                type="button"
                className={clsx(
                    "flex items-center gap-2 px-3 py-2 border rounded-lg text-sm bg-white",
                    styles.datepickerbutton
                )}
                onClick={onClick}
                ref={ref}
            >
                <img src="/img/icons/datepicker.svg" alt="datepicker" className={styles.datepickersvg} />
                <span>{displayValue}</span>
            </button>
        );
    });

    const bankList = latestByBank.map((r) => banksMap[r.bank]?.name || r.bank).filter(Boolean).join(", ");

    const formattedDateForPlaceholder = formatDateLongByLocale(selectedDate, locale);
    const formattedDateForHeader = formatTimeByLocale(selectedDate, locale, blok.updatedat);

    const currencyBuy = bestBuyRate ? formatNumber(bestBuyRate) : "-";
    const currencySell = bestSellRate ? formatNumber(bestSellRate) : "-";

    const placeholders = {
        date: formatDateLongByLocale(selectedDate, locale),
        currency: selectedCurrency,
        best_bank_buy: bestBankBuy,
        best_bank_sell: bestBankSell,
        currency_buy: currencyBuy,
        currency_sell: currencySell,
        best_buy: currencyBuy,
        best_sell: currencySell,
        bank_list: Object.values(banksMap).map((b) => b.name).join(", "),
    };


    const dynamicText1 = formatDynamicText(blok.text1, locale, placeholders);
    const dynamicText2 = formatDynamicText(blok.text2, locale, placeholders);
    const dynamicText3 = formatDynamicText(blok.text3, locale, placeholders);
    const handleSort = (field) => {
        if (sortField === field) {
            setSortAsc(!sortAsc);
        } else {
            setSortField(field);
            setSortAsc(true);
        }
    };

    const showMoreTextRaw =
        blok[isExpanded ? "hideall" : "showall"]?.[locale] ||
        blok[isExpanded ? "hideall" : "showall"];
    const showMoreText = showMoreTextRaw?.replace(/%s/g, selectedCurrency);

    const today = new Date();
    const isToday =
        selectedDate.getFullYear() === today.getFullYear() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getDate() === today.getDate();

    return (
        <section className={styles.bestOfferForEachBank} {...storyblokEditable(blok)}>
            <div className={clsx("container", styles.content)}>
                <div className={styles.text1Block} dangerouslySetInnerHTML={{ __html: dynamicText1.replace(/\n/g, "<br>") }} />

                <div className={styles.filterBlock}>
                    <div className={styles.filterBlockDate}>{formattedDateForHeader}</div>

                    <div className={styles.filterBlockFilter}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={setSelectedDate}
                            dateFormat="dd MMMM yyyy"
                            locale={locale}
                            includeDates={availableDates}
                            customInput={<CustomInput />}
                        />

                        <CurrencyDropdown
                            currenciesList={currenciesList}
                            selectedCurrency={selectedCurrency}
                            setSelectedCurrency={setSelectedCurrency}
                        />
                    </div>
                </div>
                {!isToday && (
                    <div
                        className={styles.text3Block}
                        dangerouslySetInnerHTML={{ __html: dynamicText3.replace(/\n/g, "<br>") }}
                    />
                )}
                <div className={styles.tableWrapper}>
                    <div className={styles.table}>
                        <div className={clsx(styles.row, styles.header)}>
                            <div>{render(blok.bank?.[locale] || blok.bank)}</div>

                            <div className={styles.sortable} onClick={() => handleSort("buy")}>
                                {render(blok.buy?.[locale] || blok.buy)}
                                <span className={styles.sortIcons}>
                                  {sortField === "buy" ? (
                                      sortAsc ? (
                                          <img src="/img/icons/sortarrowup.svg" alt="Sort ascending" className={styles.sortArrow} />
                                      ) : (
                                          <img src="/img/icons/sortarrowdown.svg" alt="Sort descending" className={styles.sortArrow} />
                                      )
                                  ) : (
                                      <img src="/img/icons/sortarrow2.svg" alt="Unsorted" className={styles.sortArrow} />
                                  )}
                                </span>
                            </div>

                            <div className={styles.sortable} onClick={() => handleSort("sell")}>
                                {render(blok.sell?.[locale] || blok.sell)}
                                <span className={styles.sortIcons}>
                                  {sortField === "sell" ? (
                                      sortAsc ? (
                                          <img src="/img/icons/sortarrowup.svg" alt="Sort ascending" className={styles.sortArrow} />
                                      ) : (
                                          <img src="/img/icons/sortarrowdown.svg" alt="Sort descending" className={styles.sortArrow} />
                                      )
                                  ) : (
                                      <img src="/img/icons/sortarrow2.svg" alt="Unsorted" className={styles.sortArrow} />
                                  )}
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

                                    <div className={clsx(styles.buy, r.buy === bestBuyRate && styles.best_buy)}>
                                        <div className={styles.buy_mobile}>{render(blok.buy?.[locale] || blok.buy)}</div>
                                        <div className={styles.buy_wrap}>
                                            {r.buy === bestBuyRate && (
                                                <span className={styles.crownWrapper}>
                                                  <span className={styles.crown}>
                                                    <img src="/img/icons/crown.png" alt="Best buy rate" className={styles.crown} />
                                                  </span>
                                                  <span className={styles.tooltip}>Best buy rate</span>
                                                </span>
                                            )}
                                            <span className={styles.boldnumber}>{formatNumber(r.buy)}</span> IDR
                                        </div>
                                    </div>

                                    <div className={clsx(styles.sell, r.sell === bestSellRate && styles.best_sell)}>
                                        <div className={styles.sell_mobile}>{render(blok.sell?.[locale] || blok.sell)}</div>
                                        <div className={styles.sell_wrap}>
                                            {r.sell === bestSellRate && (
                                                <span className={styles.crownWrapper}>
                                                  <img src="/img/icons/crown.png" alt="Best sell rate" className={styles.crown} />
                                                  <span className={styles.tooltip}>Best sell rate</span>
                                                </span>
                                            )}
                                            <span className={styles.boldnumber}>{formatNumber(r.sell)}</span> IDR
                                        </div>
                                    </div>

                                    <div className={styles.wrapdetail}>
                                        <Link href={banksMap[r.bank]?.url || "#"} passHref  className={styles.detail}>
                                            {blok.detail}
                                        </Link>
                                    </div>

                                    {r.img && (
                                        <div className={styles.serviceImg}>
                                            <Image src={r.img} alt={banksMap[r.bank]?.name || ""} fill style={{ objectFit: "cover" }} />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className={styles.noData}>No data for {selectedCurrency}</div>
                        )}
                    </div>
                </div>

                {sortedRates.length > 5 && (
                    <div className={styles.buttonWrapper}>
                        <button
                            className={styles.showMoreBtn}
                            onClick={() => setVisibleCount(isExpanded ? 5 : sortedRates.length)}
                        >
                            {render(showMoreText)}
                        </button>
                    </div>
                )}
                <div className={styles.text2Block} dangerouslySetInnerHTML={{ __html: dynamicText2.replace(/\n/g, "<br>") }} />
            </div>
        </section>
    );
};

export default BestOfferForEachBank;
