import React from 'react';
import styles from '@/components/Breadcrumbs/Breadcrumbs.module.scss'
import Link from "next/link";
import clsx from "clsx";


const Breadcrumbs = ({links, onHero}) => {
    const lastSearch = (arr) =>{
        for(let i =0; i<arr.length; i++){
            if(i === arr.length-1){
                return links[i].label;
            }
        }
    }
    let last = lastSearch(links)
    return (
        <div className={clsx(onHero && "z-10 relative mb-20 lg:mb-8")}>
                <div className={styles.container}>
                    {links.map((e, _uid)=>(
                        <div className={styles.block} key={_uid}>
                            <Link className={styles.link} href={e.link.linktype === "story" ? "/" + e.link.cached_url : e.link.cached_url}>
                                {e.label}
                            </Link>
                            {e.label !== last && (
                                <span className={styles.line}> </span>
                            )}

                        </div>

                    ))}
                </div>
        </div>
    );
};


export default Breadcrumbs;