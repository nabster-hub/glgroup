import React from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from "/components/Slider/slider.module.scss"
import clsx from "clsx";
import {fetchData} from "@/lib/api";
import {NextIntlClientProvider, useLocale} from "next-intl";
import {getTranslations} from 'next-intl/server';
import NavMenu from "@/components/NavMenu/NavMenu";
import CookieAlert from "@/components/CookieAlert/CookieAlert";
import StoryblokBridgeLoader from "@storyblok/react/bridge-loader";

export const metadata = {
    title: '404 page not found',
    description: '404 page not found',
}

export default async function NotFound  ({}) {
    const locale = useLocale();
    const global = await fetchData('global', {version: 'draft', language: locale})
    // console.log(locale)
    const footer = {
        title: global.data.story?.content?.title,
        description: global.data.story?.content?.description,
        contactLabel: global.data.story?.content?.contactLabel,
        contactLink: global.data.story?.content?.contactLink,
        navigationLabel: global.data.story?.content?.navigationLabel,
        homeLinkLabel: global.data.story?.content?.homeLinkLabel,
        copyright: global.data.story?.content?.copyright,
        privacyLabel: global.data.story?.content?.privacyLabel,
        privacyLink: global.data.story?.content?.privacyLink,
        offerLabel: global.data.story?.content?.offerLabel,
        offerLink: global.data.story?.content?.offerLink,
        contactUsLabel: global.data.story?.content?.contactUsLabel,
        address: global.data.story?.content?.address,
    };
    const headMenu = global.data.story?.content.linkMenu[0];
    const menu = global.data.story?.content.linkMenu[1];

    const t = await getTranslations('Notfound');
    return (
        <html>
        <body>
        <NextIntlClientProvider locale={locale}>
            <NavMenu headMenu={headMenu} menu={menu}/>
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
                                <div
                                    className={"text-9xl lg:text-12xl font-gilroy font-bold text-center mb-3 lg:mb-4 leading-tight"}>
                                    404
                                </div>
                                <span
                                    className={'font-medium text-sm md:text-2xl text-center block '}>{t('title')}</span>
                            </div>
                            <Link href={'/'} className={'link-not-found'}>{t('link')}</Link>

                        </div>
                    </div>
                </div>

            </section>
            <CookieAlert data={global.data.story.content.CookieMessage} />
        </NextIntlClientProvider>
        </body>
        <StoryblokBridgeLoader options={{}} />
        </html>

    );
};
