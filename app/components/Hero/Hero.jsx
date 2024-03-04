import React from 'react';
import styles from './Hero.module.scss';
import Header from "@/app/components/header/header";
import Menu from "@/app/components/menu/menu";
import Slider from "@/app/components/Slider/Slider";
import clsx from "clsx";
import {Swiper} from "swiper";

const Hero = ({topmenu}) => {
    const headMenu = topmenu[0];
    const menu = topmenu[1];
    return (
        <div className={clsx(styles.hero, '')}>
            <div className="absolute top-0 w-full z-10">
                <Header links={headMenu}/>
                <Menu menu={menu}/>
            </div>
            <Slider />
        </div>

    );
};

export default Hero;