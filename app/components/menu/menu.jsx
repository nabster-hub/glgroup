import React from 'react';
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const Menu = ({menu}) => {
    return (
        <div className={'container hidden lg:flex justify-between text-white'}>
            <div className={'flex gap-2.5 items-center'}>
                <Link href={'#'} className="flex gap-4">
                    <Image src={'/img/logo.png'} alt={"Logo"}
                           width={59}
                           height={59}
                    />
                    <span className={'max-w-[136px] font-extrabold text-xl uppercase'}>{menu.siteName}</span>
                </Link>
                <span className={'text-base lowercase max-w-[139px] leading-4'}>{menu.siteDescription}</span>
            </div>
            <div className={'flex gap-10 py-2.5 items-center font-gilroy font-bold text-lg'}>
                {menu?.links && menu.links.map((e, _uid)=>(
                            <Link href={e.link.linktype === "story" ? "/"+e.link.cached_url : e.link.cached_url} key={_uid} className={clsx(!e.contact && 'hover:text-yellow-active', e.contact && 'border-yellow-active text-yellow-active border rounded-3xl  px-3 py-2.5 hover:bg-yellow-active hover:text-black')}>
                                {e.label}
                            </Link>
                   ))}
            </div>
        </div>

    );
};

export default Menu;