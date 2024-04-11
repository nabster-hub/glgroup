import React from 'react';
import styles from './header.module.scss';
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const Header = ({links, type}) => {
    const itemLinks = links?.links;
    const socials = links?.socials;
    const mail = links?.label;
    const mailIcon = links?.icon;
    const mailIconBlack = links?.iconBlack;
    const whatsappNum = links?.numberWhatsapp;
    const whatsappIcon = links?.imageWhatsapp;
    const wpiconBlack = links?.ImageWpBlock;
    const number = links?.whatsappNumber;
    return (
        <div className={clsx('py-5 mb-6', styles.header, type && (styles.black), type ? 'text-black' : 'text-white')}>

            <div className={'container flex justify-between h-full'}>
                <div className={'flex gap-4 xl:gap-10 font-gilroy text-base font-normal'}>
                    {itemLinks && itemLinks.map((e, _uid)=>(
                         <Link href={e.link.linktype === "story" ? "/"+e.link.cached_url : e.link.cached_url} key={_uid} className={'hover:text-yellow-active'}>{e.label}</Link>
                    ))}
                </div>
                <div className={'flex gap-5 xl:gap-10'}>
                    <div className={clsx('flex items-center gap-3 xl:gap-4', type && styles.imgBlack)}>
                        {socials && socials.map((e, _uid)=>(
                            <Link href={e.link.linktype === "story" ? "/"+e.link.cached_url : e.link.cached_url } key={_uid}>
                                {type ? (
                                    <Image src={e.blackImg.filename} width={'20'} height={'20'} alt={e.blackImg.alt} />
                                ):(
                                    <Image src={e.image.filename} width={'20'} height={'20'} alt={e.image.alt} />
                                )}

                            </Link>
                        ))}
                    </div>
                    <Link href={'mailto:'+mail} className={'flex lg:gap-2 xl:gap-3 items-center hover:text-yellow-active '}>
                        {type ? (
                            <Image src={mailIconBlack.filename} width={'24'} height={'24'} alt={mailIconBlack.alt}/>
                        ):(
                            <Image src={mailIcon.filename} width={'24'} height={'24'} alt={mailIcon.alt}/>
                        )}
                        <span className={'font-gilroy font-bold text-sm'}>{mail}</span>
                    </Link>
                    <Link href={'https://wa.me/'+number} className={clsx("flex lg:gap-2 xl:gap-3 hover:text-yellow-active")}>
                        {type ? (
                            <Image src={wpiconBlack.filename} width={'21'} height={'21'} alt={wpiconBlack.alt}/>
                        ): (
                            <Image src={whatsappIcon.filename} width={'21'} height={'21'} alt={whatsappIcon.alt}/>
                        )}
                        <span className={'font-gilroy font-bold text-xl'}>{whatsappNum}</span>
                    </Link>
                    <div className="flex lg:gap-2 xl:gap-3 font-gilroy font-bold text-sm items-center">
                        <Link href={'#'} className={'text-yellow-active hover:text-yellow-active'}>
                            RU
                        </Link>
                        <span className={clsx(styles.vertLine, type && styles.black)}></span>
                        <Link href={'#'} className={'hover:text-yellow-active'}>
                            EN
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Header;