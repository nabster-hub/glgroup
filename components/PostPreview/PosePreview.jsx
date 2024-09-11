'use client';
import React, {useEffect, useState} from 'react';
import styles from './PostPreview.module.scss';
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {storyblokEditable} from "@storyblok/react";

const PosePreview = ({blok, other, locale}) => {
    const date = new Date(blok.published_at);
    const formattedDate = date.toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
    const createLink = (link) => {
        if(locale === 'ru'){
            return '/ru/'+link.cached_url;
        }else if(locale === 'en' && link.linktype !== 'story'){
            return '/en/'+link.cached_url;
        }else{
            return link.cached_url;
        }
    }

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <=768);
        };
        handleResize();

        window.addEventListener('resize', handleResize);

        return () =>{
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const postContent = (
        <div {...storyblokEditable(blok)} className={styles.postPreview}>
            <div className={clsx(styles.imgBlock, other && styles.other)}>
                <Image
                    src={blok.content.img.filename}
                    alt={blok.content.img.alt}
                    fill
                    quality={80}
                    sizes="(max-width: 768px) 50vw,
                                 (max-width: 1200px) 25vw,
                                 25vw"
                    style={{
                        objectFit: "cover",
                    }}
                />
            </div>
            <div className={styles.contentBlock}>
                <div className="flex flex-1 justify-between mb-4">
                    <span className={styles.date}>{formattedDate}</span>
                    {(blok.content?.showAuthor && blok.content.Author?.id) && (
                        <Link href={createLink(blok.content.Author)}
                              className={styles.author}>{blok.content.authorLabel}</Link>
                    )}

                </div>
                <div className={styles.textBlock}>
                    <h2 className={styles.h2}>
                        {blok.content.title}
                    </h2>
                    <div className={styles.text}>
                        {blok.content.description}
                    </div>
                </div>
                <Link href={'/' + blok.full_slug} className={styles.read}>{locale === 'ru' ? "Читать" : "Read"}</Link>
            </div>
        </div>
    );

    if(isMobile){
        return (
            <Link href={'/'+blok.full_slug}>
                {postContent}
            </Link>
        )
    }

    return postContent;
};


export default PosePreview;