import React from 'react';
import styles from '@/components/Breadcrumbs/Breadcrumbs.module.scss'
import Link from "next/link";
import clsx from "clsx";
import {useLocale} from "next-intl";


const Breadcrumbs = ({links, onHero}) => {
    const locale = useLocale();
    const lastSearch = (arr) =>{
        for(let i =0; i<arr.length; i++){
            if(i === arr.length-1){
                return links[i].label;
            }
        }
    }
    let last = lastSearch(links)

    const createLink = (link) => {
        if(locale === 'ru' && link.linktype === 'story'){
            return '/ru/'+link.cached_url;
        }else{
            return link.cached_url;
        }
    }
    return (
        <div className={clsx(onHero && "z-10 relative mb-20 lg:mb-8")}>
            <ol itemScope itemType={'https://schema.org/BreadcrumbList'}
                className={styles.container}>
                {links.map((e, index) => (
                    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"
                        className={styles.block} key={e._uid}>
                        <Link className={styles.link} href={createLink(e.link)} itemProp={"item"}>
                            <span itemProp="name">{e.label}</span>
                        </Link>
                        <meta itemProp={'position'} content={index+1}/>
                        {e.label !== last && (
                            <span className={styles.line}> </span>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
};


export default Breadcrumbs;