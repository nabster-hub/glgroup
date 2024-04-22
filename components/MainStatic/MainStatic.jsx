import React from 'react';
import clsx from "clsx";
import styles from "./MainStatic.module.scss";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/MainStatic/Breadcrumbs";
import {getPathname} from "@nimpl/getters/get-pathname";

const MainStatic = ({blok, breadcrumbs}) => {
    console.log(blok)
    return (
        <div className={"w-full"}>
            <div className={"relative w-full h-[100vh]"}>
                <div className={clsx("container text-white", styles.mainStatic)}>
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
                    <Breadcrumbs links={breadcrumbs.links} onHero={true}/>
                    <div className={styles.textBlock}>
                        <h1>
                            {blok.title}
                        </h1>
                        {blok?.description && (
                            <span
                                className={'text-white text-sm md:text-xl font-medium text-left mb-10 lg:mb-20  block md:w-[80%]'}>{blok.description}</span>
                        )}
                        <Link href={"#form"}
                              className={styles.button}>
                            {blok.button}
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    );
};


export default MainStatic;