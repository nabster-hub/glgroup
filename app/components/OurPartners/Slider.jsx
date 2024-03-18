"use client";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import styles from './OurPartners.module.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {useRef} from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

const Slider = ({items}) => {
    //const paginationRef = useRef(null);
    // const arrowPrev = useRef(null);
    // const arrowNext = useRef(null);
    const data = items;
    //console.log(data)
    return (
        <div className={styles.sliders}>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                modules={[Navigation]}
                navigation={
                    true
                }

                className="partners"
            >
                    {data.map((e, _uid)=>(
                        <SwiperSlide key={_uid}>
                            <div className={styles.slideContainer}>
                                <Image src={e.image.filename}
                                       fill
                                       quality={80}
                                    // width={300}
                                    // height={100}
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

                {/*<div className="absolute top-0 w-full h-full">*/}
                {/*    <div className="container relative w-full h-full">*/}
                {/*        <div className="swiper-button-prev" ref={arrowPrev}></div>*/}
                {/*        <div className="swiper-button-next" ref={arrowNext}></div>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </Swiper>
        </div>
    );
};


export default Slider;