import React from 'react';
import styles from './header.module.scss';
import Link from "next/link";
import telegram from "/public/img/icons/telegram.svg";
import vk from "/public/img/icons/vk.svg";
import fb from "/public/img/icons/facebook.svg";
import letter from '/public/img/icons/letter.svg';
import whatsapp from '/public/img/icons/whatsapp.svg';
import Image from "next/image";
import clsx from "clsx";
import MobileMenu from "@/app/components/MobileMenu/MobileMenu";

const Header = ({links}) => {
    const itemLinks = links?.links;
    const socials = links?.socials;
    const mail = links?.label;
    const mailIcon = links?.icon;
    const whatsappNum = links?.numberWhatsapp;
    const whatsappIcon = links?.imageWhatsapp;
    return (
        <header className={clsx('py-5 mb-6 text-white', styles.header)}>

            <div className={'container flex justify-between h-full'}>
                <div className={'flex gap-10 font-gilroy text-base font-normal'}>
                    {itemLinks && itemLinks.map((e, _uid)=>(
                         <Link href={e.link.linktype === "story" ? "/"+e.link.cached_url : e.link.cached_url} key={_uid} className={'hover:text-yellow-active'}>{e.label}</Link>
                    ))}
                </div>
                <div className={'flex gap-10'}>
                    <div className={'flex items-center gap-4'}>
                        {socials && socials.map((e, _uid)=>(
                            <Link href={e.link.linktype === "story" ? "/"+e.link.cached_url : e.link.cached_url } key={_uid}>
                                <Image src={e.image.filename} width={'20'} height={'20'} alt={e.image.alt}></Image>
                            </Link>
                        ))}
                    </div>
                    <div className={'flex gap-3 items-center hover:text-yellow-active '}>
                        <Image src={mailIcon.filename} width={'24'} height={'24'} alt={mailIcon.alt}/>
                        <span className={'font-gilroy font-bold text-sm'}>{mail}</span>
                    </div>
                    <div className="flex gap-3 hover:text-yellow-active">
                        <Image src={whatsappIcon.filename} width={'21'} height={'21'} alt={whatsappIcon.alt}/>
                        <span className={'font-gilroy font-bold text-xl'}>{whatsappNum}</span>
                    </div>
                    <div className="flex gap-3 font-gilroy font-bold text-sm items-center">
                        <Link href={'#'} className={'text-yellow-active hover:text-yellow-active'}>
                            RU
                        </Link>
                        <span className={styles.vertLine}></span>
                        <Link href={'#'} className={'hover:text-yellow-active'}>
                            EN
                        </Link>
                    </div>
                </div>
                {/*<MobileMenu />*/}
            </div>
        </header>
    );
};


export default Header;