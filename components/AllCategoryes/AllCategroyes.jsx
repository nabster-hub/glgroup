import React from 'react';
import styles from './AllCategoryes.module.scss';
import Link from "next/link";
import clsx from "clsx";
import {storyblokEditable} from "@storyblok/react";

const AllCategroyes = ({blok, active, locale}) => {
    function createLink(link, locale){
        if(locale === 'ru'){
            return '/ru/'+link;
        }else{
            return '/en/'+link;
        }
    }
    return (
        <div className={styles.allCategory} {...storyblokEditable(blok)}>
            {blok.map((e, index)=>(
                <Link href={createLink('blog/category/'+e.value, locale)} className={clsx(styles.item, e.value === active && styles.active)} key={index}>
                    {e.name}
                </Link>
            ))}
        </div>
    );
};


export default AllCategroyes;