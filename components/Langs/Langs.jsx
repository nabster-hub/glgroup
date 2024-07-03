'use client';
import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import styles from "@/components/header/header.module.scss";

import {useRouter} from "next/navigation";
import Link from "next/link";

const Langs = ({type, locale}) => {
    const [url, setUrl] = useState('')
    useEffect(()=>{
        let pathname = window.location.pathname.replace(/^\/[a-z]{2}/, '');
        setUrl(pathname);
    })
    return (
        <div className="flex lg:gap-2 xl:gap-3 font-gilroy font-bold text-sm items-center">
            <Link href={'/ru'+url}
                  className={clsx(locale === 'ru' ? (type ? "text-green-active" : "text-yellow-active") : (type ? "hover:text-green-active" : "hover:text-yellow-active"))}>
                RU
            </Link>
            <span className={clsx(styles.vertLine, type && styles.black)}></span>
            <Link href={'/en'+url}
                  className={clsx(locale === 'en' ? (type ? "text-green-active" : "text-yellow-active") : (type ? "hover:text-green-active" : "hover:text-yellow-active"))}>
                EN
            </Link>
        </div>
    );
};


export default Langs;