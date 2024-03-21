"use client";
import React, {useRef, useState} from 'react';
import styles from './OurCases.module.scss';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import clsx from "clsx";
import {render} from "storyblok-rich-text-react-renderer";
import Link from "next/link";

const OurCases = ({blok}) => {
    const [activeTab, setActiveTab] = useState(0);

    const swiperRef = useRef(null);


    const slides = [
        {
            tabName: 'Платежный агент',
            title: 'Slide 1 Title',
            content: 'Slide 1 Content',
        },
        {
            tabName: 'Криптовалюта',
            title: 'Slide 2 Title',
            content: 'Slide 2 Content',
        },
        {
            tabName: 'Оптимизация',
            title: 'Slide 3 Title',
            content: 'Slide 3 Content',
        },
        {
            tabName: 'Реэкспорт',
            title: 'Slide 3 Title',
            content: 'Slide 3 Content',
        },
        {
            tabName: 'Дистрибьюция',
            title: 'Slide 3 Title',
            content: 'Slide 3 Content',
        },
        {
            tabName: 'Недвижимость',
            title: 'Slide 3 Title',
            content: 'Slide 3 Content',
        },
    ];
    const handleClick = (index) => {
        setActiveTab(index);
        swiperRef.current.swiper.slideTo(index);
    };
    return (
        <section className={'py-24'}>
            <div className="container">
                <div className={styles.titleBlock}>
                    <div className={styles.subTitle}>{blok.subTitle}</div>
                    <h2 className={"h2"}>{blok.title}</h2>
                </div>
                <div className={styles.sliders}>
                    <div className={styles.tabLines}>
                        {blok.cases.map((slide, index) => (
                            <div
                                key={index}
                                className={clsx(styles.tab, activeTab === index && styles.active)}
                                onClick={() => handleClick(index)}
                            >
                                {slide.name}
                            </div>
                        ))}
                    </div>
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
                    >
                        {blok.cases.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className={styles.slider}>
                                    <div className={styles.decsrBlock}>
                                        <span className={styles.label}>{slide.descriptLabel}</span>
                                        <div className={styles.text}>{render(slide.description)}</div>
                                    </div>
                                    <div className={styles.solutionBlock}>
                                        <span className={styles.label}>{slide.solutionLabel}</span>
                                        <div className={styles.text}>{render(slide.solution)}</div>
                                    </div>
                                    <div className={styles.buttonBlock}>
                                        <Link href={slide?.link.linktype === "story" ? "/"+slide.link.cached_url : slide.link.cached_url} className={styles.button}>{slide.linkLabel}</Link>
                                    </div>

                                </div>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};


export default OurCases;