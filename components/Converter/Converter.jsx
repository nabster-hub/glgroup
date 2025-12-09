"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { storyblokEditable } from "@storyblok/react";
import clsx from "clsx";
import styles from "./converter.module.scss";
import { render } from "storyblok-rich-text-react-renderer";

function Dropdown({ list, selected, setSelected, getLabel, getIcon }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        setSelected(item);
        setOpen(false);
    };

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
                                onClick={() => handleSelect(item)}
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

export default function Converter({ blok, rates = [], ratesBI = [], banksMap = {}, currenciesMap = {} }) {
    const [mode, setMode] = useState("buy");
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [selectedBank, setSelectedBank] = useState("bi.go.id");
    const [amountIDR, setAmountIDR] = useState("");
    const [amountForeign, setAmountForeign] = useState("1");

    const currenciesList = Object.keys(currenciesMap || {});

    const currentRate = useMemo(() => {
        if (!selectedCurrency || !selectedBank) return null;
        const found = ratesBI.find(
            (r) => r.currency === selectedCurrency && r.bank === selectedBank
        );
        return found ? (mode === "buy" ? found.buy : found.sell) : null;
    }, [selectedCurrency, selectedBank, mode, ratesBI]);

    useEffect(() => {
        if (currentRate && amountForeign) {
            const numeric = parseFloat(amountForeign.replace(",", "."));
            if (!isNaN(numeric)) {
                setAmountIDR((numeric * currentRate).toFixed(2));
            }
        }
    }, [currentRate, selectedCurrency, selectedBank, mode]);

    const handleForeignChange = (val) => {
        const clean = val.replace(/[^0-9.,]/g, "");
        setAmountForeign(clean);
        const numeric = parseFloat(clean.replace(",", "."));
        if (currentRate && !isNaN(numeric)) {
            setAmountIDR((numeric * currentRate).toFixed(2));
        } else {
            setAmountIDR("");
        }
    };

    const handleIDRChange = (val) => {
        const clean = val.replace(/[^0-9.,]/g, "");
        setAmountIDR(clean);
        const numeric = parseFloat(clean.replace(",", "."));
        if (currentRate && !isNaN(numeric)) {
            setAmountForeign((numeric / currentRate).toFixed(4));
        } else {
            setAmountForeign("");
        }
    };

    return (
        <section className={clsx(styles.Converter)} {...storyblokEditable(blok)}>
            <div className={clsx(styles.content)}>
                <div className={styles.wrapBlock}>
                    <div>
                        <div className={styles.headerBlock}>
                            <div className={styles.swapButtons}>
                                <button
                                    className={clsx(styles.buttonSwapped, mode === "buy" && styles.active)}
                                    onClick={() => setMode("buy")}
                                >
                                    {render(blok.buy)}
                                </button>
                                <button
                                    className={clsx(styles.buttonSwapped, mode === "sell" && styles.active)}
                                    onClick={() => setMode("sell")}
                                >
                                    {render(blok.sell)}
                                </button>
                            </div>

                            <div className={styles.filters}>
                                <Dropdown
                                    list={currenciesList}
                                    selected={selectedCurrency}
                                    setSelected={setSelectedCurrency}
                                    getLabel={(cur) => cur}
                                    getIcon={(cur) => `/img/flags/twemoji_flag-${cur}.svg`}
                                />
                            </div>
                        </div>

                        <div className={styles.contentBlock}>
                            <div className={clsx(styles.inputGroup, styles.withCurrency)}>
                                <input
                                    type="text"
                                    value={amountIDR}
                                    onChange={(e) => handleIDRChange(e.target.value)}
                                    className={styles.textInput}
                                />
                                <span className={styles.currencyLabel}>IDR</span>
                            </div>

                            <div className={styles.equals}>=</div>

                            <div className={clsx(styles.inputGroup, styles.withCurrency)}>
                                <input
                                    type="text"
                                    value={amountForeign}
                                    onChange={(e) => handleForeignChange(e.target.value)}
                                    className={styles.textInput}
                                />
                                <span className={styles.currencyLabel}>{selectedCurrency}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerBlock}>
                        <div className={styles.date}>
                            {new Date().toLocaleDateString("uk-UA").replace(/\//g, ".")}
                        </div>
                        {banksMap[selectedBank] && (
                            <div className={styles.bankInfo}>
                                <span className={styles.bankName}>{banksMap[selectedBank].name}</span>
                                <img
                                    src={banksMap[selectedBank].logo || "/img/icons/bank-default.svg"}
                                    alt={banksMap[selectedBank].name}
                                    className={styles.bankLogo}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
