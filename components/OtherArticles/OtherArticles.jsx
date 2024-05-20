"use client";
import React, {useRef} from 'react';
import {getStoryblokApi} from "@storyblok/react/rsc";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PosePreview from "@/components/PostPreview/PosePreview";
import styles from "./OtherArticles.module.scss";
import {storyblokEditable} from "@storyblok/react";



export default async function OtherArticles ({posts}) {
    const arrowPrev = useRef(null);
    const arrowNext = useRef(null);

    return (
        <section {...storyblokEditable(blok)}>
            <div className="container py-24">
                <div className={styles.block}>
                    <h2 className={styles.title}>
                        Другие статьи
                    </h2>
                    <Swiper
                        pagination={{
                            type: 'fraction',
                        }}
                        slidesPerView={3}
                        spaceBetween={45}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = arrowPrev.current;
                            swiper.params.navigation.nextEl = arrowNext.current;
                        }}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: arrowPrev.current,
                            nextEl: arrowNext.current,
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.2,
                                spaceBetween: 20
                            },
                            550: {
                                slidesPerView: 1.7,
                                spaceBetween: 20
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView:3,
                                spaceBetween: 45
                            }
                        }}

                        className="otherArticles"
                    >
                        {posts.map((e, _uid) => (
                            <SwiperSlide key={_uid}>
                                <PosePreview blok={e} key={_uid} other={true}/>
                            </SwiperSlide>
                        ))}

                        <div
                            className="absolute top-0 right-0 min-w-[151px] min-h-[58px]">
                            <div className={"otherArrows"}>
                                <div className="swiper-button-prev" ref={arrowPrev}></div>
                                <div className="swiper-button-next" ref={arrowNext}></div>
                            </div>
                        </div>
                    </Swiper>
                </div>

            </div>
        </section>
    );
};
