import React from 'react';
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const Menu = () => {
    return (
        <div className={'hidden container md:flex justify-between text-white'}>
            <div className={'flex gap-2.5 items-center'}>
                <Link href={'#'} className="flex gap-4">
                    <Image src={'/img/logo.png'} alt={"Logo"}
                           width={59}
                           height={59}
                    />
                    <span className={'max-w-[136px] font-extrabold text-xl uppercase'}>Good Luck Group</span>
                </Link>
                <span className={'text-sm lowercase max-w-[139px] leading-4'}>международное консалтинговое агентство</span>
            </div>
            <div className={'flex gap-16 py-2.5 items-center font-gilroy font-bold text-lg'}>
                <Link href={'#'} className={'hover:text-yellow-active'}>
                    Главная
                </Link>
                <Link href={'#'} className={'hover:text-yellow-active'}>
                    О нас
                </Link>
                <Link href={'#'} className={'hover:text-yellow-active'}>
                    Преимущества
                </Link>
                <Link href={'#'} className={'hover:text-yellow-active'}>
                    Контакты
                </Link>
                <Link href={'#'} className={clsx('border-yellow-active border rounded-3xl text-yellow-active px-3 py-2.5 hover:bg-yellow-active hover:text-black')}>
                    Обратный звонок
                </Link>
            </div>
        </div>

    );
};

export default Menu;