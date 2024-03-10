import React from 'react';
import styles from "./Grid.module.scss";
import Image from "next/image";
import {render} from 'storyblok-rich-text-react-renderer';

const GridItem = ({blok}) => {
    return (
        <div className={styles.block}>
            <div className={styles.titleBlock}>
                <div className={styles.icon}>
                    <i>
                        <Image src={blok.icon.filename} alt={blok.icon.alt} width={44} height={44} />
                    </i>
                </div>
                <h3>{blok.label}</h3>
            </div>
            <div className={styles.text}>
                {render(blok.text)}
            </div>
        </div>
    );
};


export default GridItem;