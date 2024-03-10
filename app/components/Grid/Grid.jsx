import React from 'react';
import styles from "./Grid.module.scss";
import {StoryblokComponent} from "@storyblok/react/rsc";


const Grid = ({blok}) => {
    return (
        <section>
            <div className="container pb-24">
                <div className={styles.titleBlock}>
                    <h2 className="h2">{blok.title}</h2>
                </div>
                <div className={styles.blocks}>
                    {blok.columns && blok.columns.map((e, _uid)=>(
                        <StoryblokComponent blok={e}  />
                    ))}
                </div>
            </div>
        </section>
    );
};


export default Grid;