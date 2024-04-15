'use client';
import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import Header from "@/components/header/header";
import Menu from "@/components/menu/menu";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import {usePathname} from "next/navigation";
import useScrollOffset from "@/lib/offset";
import styles from "./NavMenu.module.scss"

export default function NavMenu ({headMenu, menu}) {
    const pathname = usePathname();
    const [white, setWhite] = useState(false);
    const [fixed, setFixed] = useState(false);
    const offset = useScrollOffset();

    const paths = [
        'rules',
        'blog',
    ]
    const checkType = (path) => {
        const  parts = path.split('/');
        if(paths.includes(parts[1])){
            return true;
        }else{
            return false;
        }
    }
    const fix = ()=>{
        if(offset > 50){
            return true;
        }else {
            return false;
        }
    }
    useEffect(() => {
        setWhite(checkType(pathname))
        setFixed(fix)
    }, [pathname, offset]);

    return (
        <header className={clsx(!white ? `w-full z-10 ${styles.blackMenu}` : `w-full mb-5 lg:mb-12 ${styles.whiteMenu}`, fixed ? styles.fixed : '')}>
            <Header links={headMenu} type={white}/>
            <Menu menu={menu} type={white}/>
            <MobileMenu menu={headMenu} link={menu} type={white}/>
        </header>
    );
};

