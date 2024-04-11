import React from 'react';
import styles from "./UI.module.scss";


const Title = ({blok}) => {
    return (
        <div className={styles.titleBlock}>
            {blok.subLabel && (
                <span className={styles.subLabel}>{blok.subLabel}</span>
            )}
            <h2 className={'h2'}>{blok.title}</h2>
        </div>
    );
};


export default Title;