"use client";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import {Pagination, Navigation, Autoplay} from 'swiper/modules';
import styles from './OurRecomendations.module.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {useRef} from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Slider = ({items}) => {
    //const paginationRef = useRef(null);
    const arrowPrev = useRef(null);
    const arrowNext = useRef(null);

    return (
        <Marquee className={styles.sliders} autoFill={true} speed={80}>
            {/*<Swiper*/}
            {/*    slidesPerView={2}*/}
            {/*    spaceBetween={26}*/}
            {/*    loop={true}*/}
            {/*    autoplay={{*/}
            {/*        delay: 1500,*/}
            {/*        pauseOnMouseEnter: true,*/}
            {/*    }}*/}
            {/*    breakpoints={{*/}
            {/*        320: {*/}
            {/*            slidesPerView: 1,*/}
            {/*            spaceBetween: 26*/}
            {/*        },*/}
            {/*        420: {*/}
            {/*            slidesPerView: 1.2,*/}
            {/*            spaceBetween: 26*/}
            {/*        },*/}
            {/*        475: {*/}
            {/*            slidesPerView: 1.5,*/}
            {/*            spaceBetween: 26*/}
            {/*        },*/}
            {/*        640: {*/}
            {/*            slidesPerView: 2,*/}
            {/*            spaceBetween: 26*/}
            {/*        },*/}
            {/*        1024: {*/}
            {/*            slidesPerView: 2.5,*/}
            {/*            spaceBetween: 26*/}
            {/*        },*/}
            {/*        1280: {*/}
            {/*            slidesPerView: 3,*/}
            {/*            spaceBetween: 26*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    modules={[Autoplay, Navigation]}*/}
            {/*    navigation={{*/}
            {/*        prevEl: arrowPrev.current,*/}
            {/*        nextEl: arrowNext.current,*/}
            {/*    }}*/}
            {/*    onBeforeInit={(swiper) => {*/}
            {/*        swiper.params.navigation.prevEl = arrowPrev.current;*/}
            {/*        swiper.params.navigation.nextEl = arrowNext.current;*/}
            {/*    }}*/}
            {/*    className="recomends"*/}
            {/*>*/}

            {/*    {items.map((e, _uid) => (*/}
            {/*        <SwiperSlide key={_uid}>*/}
            {/*            <div className={styles.slideContainer}>*/}
            {/*                <span className={styles.quotes}>“</span>*/}
            {/*                <h3>{e.name}</h3>*/}
            {/*                <span className={styles.job}>{e.jobTitle}</span>*/}
            {/*                <p>*/}
            {/*                    {e.text}*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </SwiperSlide>*/}
            {/*    ))}*/}
            {/*    {items.map((e, _uid) => (*/}
            {/*        <SwiperSlide key={_uid}>*/}
            {/*            <div className={styles.slideContainer}>*/}
            {/*                <span className={styles.quotes}>“</span>*/}
            {/*                <h3>{e.name}</h3>*/}
            {/*                <span className={styles.job}>{e.jobTitle}</span>*/}
            {/*                <p>*/}
            {/*                    {e.text}*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </SwiperSlide>*/}
            {/*    ))}*/}
            {/*    <div className={styles.arrows}>*/}
            {/*        <div className="swiper-button-prev" ref={arrowPrev}></div>*/}
            {/*        <div className="swiper-button-next" ref={arrowNext}></div>*/}
            {/*    </div>*/}

            {/*</Swiper>*/}

            {items.map((e, _uid) => (
                    <div className={styles.slideContainer} key={_uid}>
                        <span className={styles.quotes}>“</span>
                        <h3>{e.name}</h3>
                        <span className={styles.job}>{e.jobTitle}</span>
                        <p>
                            {e.text}
                        </p>
                    </div>
            ))}
        </Marquee>
);
};


export default Slider;