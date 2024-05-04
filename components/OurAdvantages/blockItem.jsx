import React from 'react';
import styles from './number.module.scss'
import Image from "next/image";
import {storyblokEditable} from "@storyblok/react";


const BlockItem = ({blok}) => {
    return (
        <div className={styles.blokItem} {...storyblokEditable(blok)}>
            <div className={styles.first}>
                <i>
                    <Image src={blok.icon.filename} alt={blok.icon.alt} width={44} height={44}/>
                </i>
                <div className={styles.labelItem}>
                    {blok.label}
                </div>
            </div>
            <div className={styles.textItem}>
                {blok.text}
            </div>
        </div>
    );
};


export default BlockItem;