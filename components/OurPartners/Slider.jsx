"use client";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import {Pagination, Navigation, Autoplay} from 'swiper/modules';
import styles from './OurPartners.module.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {useRef} from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

const Slider = ({items}) => {
    const arrowPrev = useRef(null);
    const arrowNext = useRef(null);
    return (
        <div className={styles.sliders}>
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                loop={true}
                centeredSlides={true}
                loopAdditionalSlides={5}
                autoplay={{
                    delay: 1000,
                    pauseOnMouseEnter: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    1024: {
                        slidesPerView:3,
                        spaceBetween: 10
                    }
                }}
                modules={[Autoplay, Navigation]}
                navigation={{
                    prevEl: arrowPrev.current,
                    nextEl: arrowNext.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = arrowPrev.current;
                    swiper.params.navigation.nextEl = arrowNext.current;
                }}

                className="partners"
            >
                    {items.map((e, _uid)=>(
                        <SwiperSlide key={_uid}>
                            <div className={styles.slideContainer}>
                                <Image src={e.image.filename}
                                       fill
                                       quality={80}

                                       sizes="(max-width: 768px) 50vw,
                             (max-width: 1200px) 25vw,
                             25vw"
                                       style={{
                                           objectFit: "contain",
                                       }}
                                       alt={e.image.alt}
                                />
                            </div>


                        </SwiperSlide>
                    ))}
                    {items.map((e, _uid)=>(
                    <SwiperSlide key={_uid}>
                        <div className={styles.slideContainer}>
                            <Image src={e.image.filename}
                                   fill
                                   quality={80}

                                   sizes="(max-width: 768px) 50vw,
                             (max-width: 1200px) 25vw,
                             25vw"
                                   style={{
                                       objectFit: "contain",
                                   }}
                                   alt={e.image.alt}
                            />
                        </div>


                    </SwiperSlide>
                ))}
                <div className={styles.arrows}>
                    <div className="swiper-button-prev" ref={arrowPrev}></div>
                    <div className="swiper-button-next" ref={arrowNext}></div>
                </div>


            </Swiper>
        </div>
    );
};


export default Slider;