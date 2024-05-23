import React from 'react';
import clsx from "clsx";
import styles from "@/components/header/header.module.scss";
import {Link} from "@/navigation";

const Langs = ({type, locale}) => {
    return (
        <div className="flex lg:gap-2 xl:gap-3 font-gilroy font-bold text-sm items-center">
            <Link href={`/ru`} locale={'ru'}
                  className={clsx(locale === 'ru' ? (type ? "text-green-active" : "text-yellow-active") : (type ? "hover:text-green-active" : "hover:text-yellow-active"))}>
                RU
            </Link>
            <span className={clsx(styles.vertLine, type && styles.black)}></span>
            <Link href={`/en`} locale={'en'}
                  className={clsx(locale === 'en' ? (type ? "text-green-active" : "text-yellow-active") : (type ? "hover:text-green-active" : "hover:text-yellow-active"))}>
                EN
            </Link>
        </div>
    );
};


export default Langs;