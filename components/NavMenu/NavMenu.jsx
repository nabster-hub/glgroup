'use client';
import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import Header from "@/components/header/header";
import Menu from "@/components/menu/menu";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import {usePathname} from "next/navigation";

export default function NavMenu ({headMenu, menu}) {
    const pathname = usePathname();
    const [white, setWhite] = useState(false);

    const paths = [
        'rules',
    ]
    const checkType = (path) => {
        const  parts = path.split('/');
        if(paths.includes(parts[1])){
            return true;
        }else{
            return false;
        }
    }

    useEffect(() => {
        setWhite(checkType(pathname))
    }, [pathname]);
    return (
        <header className={clsx(!white ? 'absolute top-0  w-full z-10' : "w-full mb-5 lg:mb-12")}>
            <Header links={headMenu} type={white}/>
            <Menu menu={menu} type={white}/>
            <MobileMenu menu={headMenu} link={menu} type={white}/>
        </header>
    );
};

