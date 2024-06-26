import React from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from "/components/Slider/slider.module.scss"
import clsx from "clsx";
import {unstable_setRequestLocale} from "next-intl/server";
import {useLocale, useTranslations} from "next-intl";

export const metadata = {
    title: '404 page not found',
    description: '404 page not found',
}

const NotFoundPage = () => {
    const local = useLocale();

    const t = useTranslations('NotFound');
    return (
        <section>
            <div className="relative w-full h-[100vh] not-found z-0">
                <Image src={"/img/banner1.png"}
                       fill
                       quality={80}
                       sizes="(max-width: 768px) 50vw,
                                 (max-width: 1200px) 25vw,
                                 25vw"
                       style={{
                           objectFit: "cover",
                       }}
                       alt={"not found"}
                />
                <div className={clsx("absolute top-0 w-full", styles.content)}>
                    <div className="container text-white">
                        <div className={clsx(styles.line, 'mx-auto', styles.error)}></div>
                        <div className={clsx(styles.textBlock, 'mt-40 lg:mt-20  mb-10', styles.error)}>
                            <div className={"text-9xl lg:text-12xl font-gilroy font-bold text-center mb-3 lg:mb-4 leading-tight"}>
                                404
                            </div>
                            <span
                                className={'font-medium text-sm md:text-2xl text-center  block '}>{t('title')}</span>
                        </div>
                        <Link href={`/${local}`} className={'link-not-found'}>{t('link')}</Link>

                    </div>
                </div>
            </div>

        </section>
    );
};

export default NotFoundPage;