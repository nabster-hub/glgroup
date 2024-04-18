import React from 'react';
import clsx from "clsx";
import styles from "@/components/Slider/slider.module.scss";
import Link from "next/link";
import Image from "next/image";

const MainStatic = ({blok}) => {
    console.log(blok)
    return (
        <div className={"w-full"}>
            <div className={"relative w-full h-[100vh]"}>
                <div className="container text-white">
                    <div className={styles.textBlock}>
                        <div className={styles.header}>
                            {blok.title}
                        </div>
                        {/*{e?.description && (*/}
                        {/*    <span*/}
                        {/*        className={'text-white text-sm md:text-xl font-medium text-center md:text-left  block md:w-[80%]'}>{e.description}</span>*/}
                        {/*)}*/}
                        {/*<Link href={e?.link.linktype === "story" ? "/" + e.link.cached_url : e.link.cached_url}*/}
                        {/*      className={styles.button}>*/}
                        {/*    {e.button}*/}
                        {/*</Link>*/}

                    </div>
                </div>
                <Image src={blok.img.filename}
                       fill
                       quality={100}
                       sizes="(max-width: 768px) 50vw,
                                 (max-width: 1200px) 25vw,
                                 25vw"
                       style={{
                           objectFit: "cover",
                       }}
                       alt={blok.img.alt}
                />
            </div>
        </div>
    );
};


export default MainStatic;