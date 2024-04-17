import React from 'react';
import styles from './PostPreview.module.scss';
import Image from "next/image";
import Link from "next/link";

const PosePreview = ({blok}) => {
    const date = new Date(blok.published_at);
    const formattedDate = date.toLocaleDateString("ru", {day: 'numeric', month: 'long', year: 'numeric'});
    return (
        <div className={styles.postPreview}>
            <div className={styles.imgBlock}>
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
                    <Link href={'#'} className={styles.author}>Иван Петров</Link>
                </div>
                <div className={styles.textBlock}>
                    <h2 className={styles.h2}>
                        {blok.content.title}
                    </h2>
                    <div className={styles.text}>
                        {blok.content.description}
                    </div>
                </div>
                <Link href={'/'+blok.full_slug} className={styles.read}>Читать</Link>
            </div>
        </div>
    );
};


export default PosePreview;