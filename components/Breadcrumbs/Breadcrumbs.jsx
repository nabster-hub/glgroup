import React from 'react';
import styles from './Breadcrumbs.module.scss'
import Link from "next/link";
import clsx from "clsx";
import {useLocale} from "next-intl";

const Breadcrumbs = ({links, author}) => {
    const locale = useLocale();
   const lastSearch = (arr) =>{
       for(let i =0; i<arr.length; i++){
            if(i === arr.length-1){
                return links[i].label;
            }
        }
    }
    let last = lastSearch(links)
    return (
        <section >
            <div className="container">
                <div className={clsx(styles.container, author && styles.author)}>
                    {links.map((e, _uid)=>(
                        <div className={styles.block} key={_uid}>
                            <Link className={styles.link} href={e.link.cached_url}>
                                {e.label}
                            </Link>
                            {e.label !== last && (
                                <span className={styles.line}> </span>
                            )}

                        </div>

                    ))}
                </div>
            </div>
        </section>
    );
};


export default Breadcrumbs;