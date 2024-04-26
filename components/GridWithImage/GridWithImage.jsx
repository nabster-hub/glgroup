import React from 'react';
import styles from './GridWithImage.module.scss'
import {StoryblokComponent} from "@storyblok/react/rsc";
const GridWithImage = ({blok}) => {
    return (
        <section className={styles.gridWithImage}>
            <div className="container">
                <h2>{blok.title}</h2>
                <div className={styles.grid}>
                    {blok?.blocks && blok.blocks.map((e, _uid)=>(
                        <StoryblokComponent blok={e} key={_uid}/>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default GridWithImage;