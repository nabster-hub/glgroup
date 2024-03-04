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
    console.log(links[0])
    const itemLinks = links?.links;
    console.log(itemLinks);
    return (
        <header className={clsx('py-5 mb-6 text-white', styles.header)}>

            <div className={'container flex justify-between h-full'}>
                <div className={'flex gap-10 font-gilroy text-base font-normal'}>
                    {links?.links && links.links.map((e, _uid)=>(
                         <Link href={e.link} className={'hover:text-yellow-active'}>{e.label}</Link>
                    ))}

                    <Link href={'#'} className={'hover:text-yellow-active'}>Контакты</Link>
                    <Link href={'#'} className={'hover:text-yellow-active'}>Услуги</Link>
                    <Link href={'#'} className={'hover:text-yellow-active'}>Блог</Link>
                </div>
                <div className={'flex gap-10'}>
                    <div className={'flex items-center gap-4'}>
                        <Link href={'#'}>
                            <Image src={telegram} alt={'telegram'}></Image>
                        </Link>
                        <Link href={'#'}>
                            <Image src={vk} alt={'vk'}></Image>
                        </Link>
                        <Link href={'#'}>
                            <Image src={fb} alt={'facebook'}></Image>
                        </Link>
                    </div>
                    <div className={'flex gap-3 items-center hover:text-yellow-active '}>
                        <Image src={letter} alt={'email'}/>
                        <span className={'font-gilroy font-bold text-sm'}>info@gl-group.consulting </span>
                    </div>
                    <div className="flex gap-3 hover:text-yellow-active">
                        <Image src={whatsapp} alt={'WhatsApp'}/>
                        <span className={'font-gilroy font-bold text-xl'}>+62 813 987 65 54</span>
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