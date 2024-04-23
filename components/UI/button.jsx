import React from 'react';
import styles from "./UI.module.scss";
import Link from "next/link";
import clsx from "clsx";


const Button = ({blok}) => {
    console.log(blok)
    return (
        <div className={clsx(styles.buttonBlock, blok.mobileCenter && styles.mobileCenter)}>
            <Link href={blok.link.linktype === 'story' ? '/'+blok.link.cached_url : blok.link.cached_url}
                  className={clsx(styles.button, blok.color === 'yellow' && styles.yellow, blok.color === 'green' && styles.green)}>{blok.label}</Link>
        </div>
    );
};


export default Button;