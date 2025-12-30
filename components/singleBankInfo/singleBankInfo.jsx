import React from 'react';
import styles from './singleBankInfo.module.scss'
import Image from "next/image";
import Breadcrumbs from "./Breadcrumbs";
import clsx from "clsx";
import {render} from "storyblok-rich-text-react-renderer";
import {storyblokEditable} from "@storyblok/react";



const singleBankInfo = ({blok}) => {
    function getTodayDateFormatted() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        return `${day}.${month}.${year}`;
    }

    return (
        <section className={styles.singleBankInfo} {...storyblokEditable(blok)}>
            <div className={clsx("container", styles.content)}>
                <div className={styles.topBlock}>
                    <Breadcrumbs onHero={true} links={blok.breadcrumbs}/>
                    <div className={styles.date}>{getTodayDateFormatted()}</div>
                </div>
                <div className={styles.contentBlock}>
                     <div className={styles.first}>
                         <h1 className={styles.title}>{blok.title}</h1>
                         <div className={styles.second}>
                             <Image
                                 src={blok?.icon.filename}
                                 alt={blok?.icon.alt || "icon"}
                                 fill
                                 style={{ objectFit: "contain" }}
                             />

                         </div>
                         <div  className={styles.third}>{render(blok.description)}</div>
                     </div>

                </div>
            </div>
        </section>
    );
};



export default singleBankInfo;