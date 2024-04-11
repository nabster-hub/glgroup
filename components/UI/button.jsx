import React from 'react';
import styles from "./UI.module.scss";
import Link from "next/link";


const Button = ({blok}) => {
    return (
        <div className={styles.buttonBlock}>
            <Link href={blok.link.linktype === 'story' ? '/'+blok.link.cached_url : blok.link.cached_url}
                  className={styles.button}>{blok.label}</Link>
        </div>
    );
};


export default Button;