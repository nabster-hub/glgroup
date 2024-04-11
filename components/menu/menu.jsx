import React from 'react';
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const Menu = ({menu, type}) => {
    return (
        <div className={clsx('container hidden lg:flex justify-between', type ? 'text-black' : 'text-white')}>
            <div className={'flex gap-2 xl:gap-2.5 items-center'}>
                <Link href={'#'} className="flex items-center lg:gap-2 xl:gap-4">
                    <Image src={'/img/logo.svg'} alt={"Logo"}
                           width={59}
                           height={59}
                           style={{width:"59px"}}
                    />
                    <span className={'h-fit max-w-[100px] xl:max-w-[136px] font-extrabold text-base xl:text-xl uppercase'}>{menu.siteName}</span>
                </Link>
                <span className={'w-fit text-sm xl:text-base lowercase lg:max-w-[119px] xl:max-w-[139px] leading-4'}>{menu.siteDescription}</span>
            </div>
            <div className={'flex lg:gap-5 xl:gap-10 py-2.5 items-center font-gilroy font-bold text-base xl:text-lg'}>
                {menu?.links && menu.links.map((e, _uid)=>(
                            <Link href={e.link.linktype === "story" ? "/"+e.link.cached_url : e.link.cached_url} key={_uid} className={clsx(!e.contact && type ? 'hover:text-green-active' :'hover:text-yellow-active', e.contact && !type && 'border-yellow-active text-yellow-active border rounded-3xl lg:px-2.5 lg:py-2 xl:px-3 xl:py-2.5 hover:bg-yellow-active hover:text-black', e.contact && type && 'border-green-active text-green-active border rounded-3xl lg:px-2.5 lg:py-2 xl:px-3 xl:py-2.5 hover:bg-green-active hover:text-black')}>
                                {e.label}
                            </Link>
                   ))}
            </div>
        </div>

    );
};

export default Menu;