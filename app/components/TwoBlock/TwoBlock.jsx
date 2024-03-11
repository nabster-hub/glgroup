import React from 'react';
import styles from "./TwoBlock.module.scss";
import Link from "next/link";
import Image from "next/image";
import {StoryblokComponent} from "@storyblok/react/rsc";
import {storyblokEditable} from "@storyblok/react";


const TwoBlock = ({blok}) => {
    // console.log(blok);
    return (
        <section {...storyblokEditable(blok)}>
            <div className={'container flex flex-col-reverse lg:flex-row pt-24 gap-12 justify-between mb-24'}>
                <div className={styles.firstBlock}>
                    {blok?.leftBlock && blok.leftBlock.map((e, _uid)=>(
                        <StoryblokComponent blok={e} key={_uid}  />
                    ))}

                </div>
                <div className={styles.secondBlock}>
                    {blok?.rightBlock && blok.rightBlock.map((e, _uid)=>(
                        <StoryblokComponent blok={e} key={_uid}  />
                    ))}
                </div>
            </div>
        </section>
    );
};


export default TwoBlock;