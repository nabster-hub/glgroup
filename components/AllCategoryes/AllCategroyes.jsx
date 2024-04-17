import React from 'react';
import styles from './AllCategoryes.module.scss';
import Link from "next/link";
import clsx from "clsx";

const AllCategroyes = ({blok, active}) => {
    return (
        <div className={styles.allCategory}>
            {blok.map((e, index)=>(
                <Link href={`/blog/category/${e.value}`} className={clsx(styles.item, e.value === active && styles.active)} key={index}>
                    {e.name}
                </Link>
            ))}
        </div>
    );
};


export default AllCategroyes;