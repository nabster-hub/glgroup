import React from 'react';
import styles from "./TwoBlock.module.scss";
import Link from "next/link";
import Image from "next/image";
import {StoryblokComponent} from "@storyblok/react/rsc";
import {storyblokEditable} from "@storyblok/react";


const TwoBlock = ({blok}) => {
    return (
        <section {...storyblokEditable(blok)}>
            <div className={'container flex flex-col-reverse lg:flex-row py-14 lg:py-24 gap-4 lg:gap-12 justify-between'}>
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