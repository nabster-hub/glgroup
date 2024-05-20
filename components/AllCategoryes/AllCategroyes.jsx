import React from 'react';
import styles from './AllCategoryes.module.scss';
import Link from "next/link";
import clsx from "clsx";
import {storyblokEditable} from "@storyblok/react";

const AllCategroyes = ({blok, active}) => {
    return (
        <div className={styles.allCategory} {...storyblokEditable(blok)}>
            {blok.map((e, index)=>(
                <Link href={`/blog/category/${e.value}`} className={clsx(styles.item, e.value === active && styles.active)} key={index}>
                    {e.name}
                </Link>
            ))}
        </div>
    );
};


export default AllCategroyes;