import React from 'react';
import styles from './Hero.module.scss';
import Header from "@/app/components/header/header";
import Menu from "@/app/components/menu/menu";
import Slider from "@/app/components/Slider/Slider";
import clsx from "clsx";
import {Swiper} from "swiper";

const Hero = () => {
    return (
        <div className={clsx(styles.hero, '')}>
            <div className="absolute top-0 w-full z-10">
                <Header/>
                <Menu/>
            </div>
            <Slider />
        </div>

    );
};

export default Hero;