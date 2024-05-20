import React from 'react';
import styles from './header.module.scss';
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import {useLocale} from "next-intl";


const Header = ({links, type, menu}) => {
    const itemLinks = links?.links;
    const socials = links?.socials;
    const mail = links?.label;
    const mailIcon = links?.icon;
    const mailIconBlack = links?.iconBlack;
    const whatsappIcon = links?.imageWhatsapp;
    const wpiconBlack = links?.ImageWpBlock;
    const number = links?.whatsappNumber;
    const locale = useLocale();

    return (
        <div className={clsx('py-5', styles.header, type && (styles.black), type ? 'text-black' : 'text-white')}>


            <div className={'container flex justify-between h-full'}>
                <div className={'flex gap-2 xl:gap-2.5 items-center'}>
                    <Link href={`/${locale}`} className="flex items-center lg:gap-2 xl:gap-4">
                        <Image src={'/img/logo.svg'} alt={"Logo"}
                               width={59}
                               height={59}
                               style={{width: "59px"}}
                        />
                        <span
                            className={'h-fit max-w-[100px] xl:max-w-[136px] font-extrabold text-base xl:text-xl uppercase'}>{menu.siteName}</span>
                    </Link>
                    <span
                        className={'w-fit font-gilroy text-sm lg:text-desc lowercase lg:max-w-[119px] xl:max-w-[139px] leading-4 lg:leading-3.5'}>{menu.siteDescription}</span>
                </div>
                <div className={'flex gap-4 xl:gap-10 font-gilroy text-base font-normal items-center'}>
                    {itemLinks && itemLinks.map((e, _uid) => (
                        <Link href={e.link.cached_url} key={_uid}
                              className={'hover:text-yellow-active'}>{e.label}</Link>
                    ))}
                </div>
                <div className={'flex gap-5 xl:gap-10'}>
                    <div className={clsx('flex items-center gap-3 xl:gap-4', type && styles.imgBlack)}>
                        {socials && socials.map((e, _uid) => (
                            <Link href={e.link.cached_url} key={_uid}>
                                {type ? (
                                    <Image src={e.blackImg.filename} width={'20'} height={'20'} alt={e.blackImg.alt}/>
                                ) : (
                                    <Image src={e.image.filename} width={'20'} height={'20'} alt={e.image.alt}/>
                                )}

                            </Link>
                        ))}
                    </div>
                    <Link href={'mailto:' + mail}
                          className={'flex lg:gap-2 xl:gap-3 items-center hover:text-yellow-active '}>
                        {type ? (
                            <Image src={mailIconBlack.filename} width={'24'} height={'24'} alt={mailIconBlack.alt}/>
                        ) : (
                            <Image src={mailIcon.filename} width={'24'} height={'24'} alt={mailIcon.alt}/>
                        )}
                    </Link>
                    <Link href={'https://wa.me/' + number}
                          className={clsx("flex lg:gap-2 xl:gap-3 hover:text-yellow-active")}>
                        {type ? (
                            <Image src={wpiconBlack.filename} width={'21'} height={'21'} alt={wpiconBlack.alt}/>
                        ) : (
                            <Image src={whatsappIcon.filename} width={'21'} height={'21'} alt={whatsappIcon.alt}/>
                        )}
                    </Link>
                    <div className="flex lg:gap-2 xl:gap-3 font-gilroy font-bold text-sm items-center">
                        <Link href={'/ru'} locale={'ru'} className={clsx(locale === 'ru' ? (type ? "text-green-active" : "text-yellow-active") : (type ? "hover:text-green-active" : "hover:text-yellow-active"))}>
                            RU
                        </Link>
                        <span className={clsx(styles.vertLine, type && styles.black)}></span>
                        <Link href={'/en'} locale={'en'} className={clsx(locale === 'en' ? (type ? "text-green-active" : "text-yellow-active") : (type ? "hover:text-green-active" : "hover:text-yellow-active"))}>
                            EN
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Header;