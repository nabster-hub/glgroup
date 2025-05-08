'use client';
import React, {useEffect, useRef} from 'react';
import styles from './AllCategoryes.module.scss';
import Link from "next/link";
import clsx from "clsx";
import {storyblokEditable} from "@storyblok/react";


const AllCategroyes = ({blok, active, locale}) => {
    const activeItemRef = useRef(null);
    const scrollContainerRef = useRef(null);

    function createLink(link, locale){
        return locale === 'ru' ? '/ru/' + link : '/en/' + link;
    }
    //console.log(activeItemRef)

    useEffect(() => {
        if(activeItemRef.current && scrollContainerRef.current){
            activeItemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            })
        }
    }, [active]);
    return (
        <div className={styles.allCategory} {...storyblokEditable(blok)} ref={scrollContainerRef}>
            {blok.map((e, index)=>(
                <Link href={ e.value === active ? createLink('blog/', locale) :
                    createLink('blog/category/'+e.value, locale)
                }
                      className={clsx(styles.item, e.value === active && styles.active)}
                      key={index}
                      ref={e.value === active ? activeItemRef : null}
                >
                    {e.name}
                </Link>
            ))}
        </div>
    );
};


export default AllCategroyes;