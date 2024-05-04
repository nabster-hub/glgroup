import React from 'react';
import {storyblokEditable} from "@storyblok/react";
import styles from "./number.module.scss";
import clsx from "clsx";
import NumberBlock from "./NumberBlock";
import BlockItem from "./blockItem";


const OurAdvantages = ({blok}) => {

    return (
        <section {...storyblokEditable(blok)} className={clsx(styles.ourAdvantages, "py-24")} id={blok.id}>
            <div className={'container'} >
                <div className={clsx(styles.titleBlock, styles.half)}>
                    {blok.subTitle && (
                        <span className={styles.subLabel}>{blok.subTitle}</span>
                    )}
                    <h2 className={'h2'}>{blok.title}</h2>
                </div>
                <div className={styles.grid}>
                    {blok.numbers && blok.numbers.map((e, _uid)=>(
                            <NumberBlock item={e} key={_uid}/>
                    ))}
                </div>
                <div className={styles.blocks}>
                    <span className={styles.label}>{blok?.titleBlock}</span>
                    <div className={styles.blockBloks}>
                        {blok.blocks && blok.blocks.map((e,_uid)=>(
                            <BlockItem key={_uid} blok={e}/>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};


export default OurAdvantages;