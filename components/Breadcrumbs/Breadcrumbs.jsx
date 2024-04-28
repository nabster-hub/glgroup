import React from 'react';
import styles from './Breadcrumbs.module.scss'
import Link from "next/link";
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import clsx from "clsx";

const Breadcrumbs = ({links, author}) => {
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
        </section>
    );
};


export default Breadcrumbs;