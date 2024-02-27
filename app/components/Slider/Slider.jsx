"use client";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import clsx from "clsx";
import Image from "next/image";
import React, { useRef, useState } from 'react';


export default function Slider() {

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
            className={'h-[90vh] min-h-[90vh]'}>
            <Swiper
                pagination={{
                    type: 'fraction',
                }}
                modules={[Pagination, Navigation]}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}

                className="mySwiper"
            >
                {slider.map((e, idx)=>(
                    <SwiperSlide key={"slide" + idx}>
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
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </div>
                </div>

            </Swiper>


        </div>
    )

}