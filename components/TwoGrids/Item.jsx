import React from 'react';
import styles from './item.module.scss'
import {render} from "storyblok-rich-text-react-renderer";

const Item = ({blok}) => {
    return (
        <div className={styles.block}>
            <span className={styles.number}>
                {blok.number}
            </span>
            <div className={styles.text}>
                {render(blok.label)}
            </div>
        </div>
    );
};


export default Item;