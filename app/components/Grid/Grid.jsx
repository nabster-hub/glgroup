import React from 'react';
import styles from "./Grid.module.scss";
import {StoryblokComponent} from "@storyblok/react/rsc";
import clsx from "clsx";


const Grid = ({blok}) => {
    return (
        <section>
            <div className="container pb-24">
                <div className={styles.titleBlock}>
                    <h2 className="h2 text-center">{blok.title}</h2>
                </div>
                <div className={clsx(styles.blocks, (typeof blok.columns[0].arrow !== 'undefined' && blok.columns[0].arrow !== null) && styles.withArrow)}>
                    {blok.columns && blok.columns.map((e, _uid)=>(
                        <StoryblokComponent blok={e} key={_uid}  />
                    ))}
                </div>
            </div>
        </section>
    );
};


export default Grid;