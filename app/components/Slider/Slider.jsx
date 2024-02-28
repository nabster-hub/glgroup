"use client";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import clsx from "clsx";
import Image from "next/image";
import React, { useRef, useState } from 'react';
import styles from './slider.module.scss'
import Link from "next/link";


export default function Slider() {
    const paginationRef = useRef(null);
    const arrowPrev = useRef(null);
    const arrowNext = useRef(null);


    const slider = [
        {
          img: '/img/banner1.png',
          header: 'Начните свой бизнес в Индонезии',
          text: 'Получите профессиональную поддержку и экспертное сопровождение в реализации своих предпринимательских идей',
          label: 'Задать вопрос',
          url: '#',
        },
        {
          img: '/img/banner2.jpg',
          header: 'Купите готовый бизнес на Бали',
          label: 'Узнать подробнее',
          url: '#',
        },
        {
          img: '/img/banner3.jpg',
          header: 'Зарегистрируйте компанию и откройте счет в Индонезии',
          label: 'Узнать подробнее',
          url: '#',
        },
    ];
    return (
        <div
            className={'h-[100vh] min-h-[100vh]'}>
            <Swiper
                pagination={{
                    type: 'fraction',
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = arrowPrev.current;
                    swiper.params.navigation.nextEl = arrowNext.current;
                    swiper.params.pagination.el = paginationRef.current;
                }}
                modules={[Pagination, Navigation]}
                navigation={{
                    prevEl: arrowPrev.current,
                    nextEl: arrowNext.current,
                }}

                className="mySwiper"
            >
                {slider.map((e, idx)=>(
                    <SwiperSlide key={"slide" + idx}>
                        <div className={clsx("absolute top-0 w-full", styles.content)}>
                            <div className="container text-white">
                                <div className={styles.line}></div>
                                <div className={styles.textBlock}>
                                    <span className={styles.groupName}>GL group consulting</span>
                                    {/*<div className={'font-gilroy text-7xl text-white font-bold mb-6'}>*/}
                                    <div className={styles.header}>
                                        {e.header}
                                    </div>
                                    {e?.text && (
                                        <span className={'text-white text-xl font-medium block w-[80%]'}>{e.text}</span>
                                    )}
                                    <Link href={e.url} className={styles.button}>
                                        {e.label}
                                    </Link>

                                </div>

                            </div>
                        </div>

                        <Image src={e.img}
                            // width={1920}
                            // height={960}
                               fill
                               quality={80}
                               sizes="(max-width: 768px) 50vw,
                                 (max-width: 1200px) 25vw,
                                 25vw"
                               style={{
                                   objectFit: "cover",
                               }}
                            //sizes={'(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw'}
                        />

                    </SwiperSlide>
                ))}
                <div className="absolute top-0 w-full h-full">
                    <div className="container relative w-full h-full">
                        <div className="swiper-button-prev" ref={arrowPrev}></div>
                        <div className="swiper-button-next" ref={arrowNext}></div>
                        <div ref={paginationRef} className={"pagginations-swiper"}></div>
                    </div>
                </div>

            </Swiper>


        </div>
    )

}