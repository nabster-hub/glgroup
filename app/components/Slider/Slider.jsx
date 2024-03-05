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


export default function Slider({items}) {
    const paginationRef = useRef(null);
    const arrowPrev = useRef(null);
    const arrowNext = useRef(null);
    const data = items[0];
    console.log(data)

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
                {data.slide.map((e, _uid)=>(
                        <SwiperSlide key={_uid}>
                        <div className={clsx("absolute top-0 w-full", styles.content)}>
                            <div className="container text-white">
                                <div className={clsx(styles.line, 'mx-auto')}></div>
                                <div className={styles.textBlock}>
                                    <span className={styles.groupName}>{data?.label}</span>
                                    <div className={styles.header}>
                                        {e.title}
                                    </div>
                                    {e?.description && (
                                        <span className={'text-white text-xl font-medium block md:w-[80%]'}>{e.description}</span>
                                    )}
                                    <Link href={e?.link.linktype === "story" ? "/"+e.link.cached_url : e.link.cached_url} className={styles.button}>
                                        {e.button}
                                    </Link>

                                </div>

                            </div>
                        </div>

                        <Image src={e.image.filename}
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
                               alt={e.image.alt}
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