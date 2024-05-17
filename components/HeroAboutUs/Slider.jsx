'use client';
import React, {useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import {Scrollbar, Pagination, Navigation, EffectFade} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import clsx from "clsx";
import styles from "./Slider.module.scss";

const Slider = ({sliders}) => {
    const arrowPrev = useRef(null);
    const arrowNext = useRef(null);
    const [activeTab, setActiveTab] = useState(2);
    const swiperRef = useRef(null);
    const containerRef = useRef(null);
    const dragRef = useRef(null);
    const allContainer = useRef(null);
    const [totalContentWidth, setTotalContentWidth] = useState(0);



    useEffect(() => {
        const scrollToActiveTab = () => {
            const activeElement = document.getElementById(`tab-${activeTab}`);
            const container = document.getElementById('container');
            let numMinus = 84;
            let numPlus = 0;

            if (!activeElement) return; // Handle if element not found
            if(containerRef.current.clientWidth < 992){
                if(containerRef.current.clientWidth <= 680 ){
                    numPlus = 0;
                }
            }

            const activeElementOffset = activeElement.offsetLeft;
            const activeElementWidth = activeElement.offsetWidth;
            const containerScrollLeft = container.scrollLeft;


            if(containerRef.current.clientWidth >200){
                let left = (activeTab)*413;
                if(containerRef.current.clientWidth >= 403 && containerRef.current.clientWidth <736){
                    left = (activeTab)*682;
                }else if(containerRef.current.clientWidth >=736 && containerRef.current.clientWidth < 992){
                    left = (activeTab)*982;
                }else if(containerRef.current.clientWidth >= 992 && containerRef.current.clientWidth < 1248){
                    left = (activeTab)*183;
                }else if(containerRef.current.clientWidth >= 1248){
                    left = (activeTab)*223;
                }
                if(activeTab === 0){
                    left = 0;
                }
                dragRef.current.style.transitionDuration = "300ms";
                dragRef.current.style.transform = `translate3d(${left}px, 0px, 0px)`;
                dragRef.current.style.transitionDelay  = '0ms';
            }


            if (containerScrollLeft >= activeElementOffset + activeElementWidth) {
                if(activeTab === 0){
                    container.scrollTo({
                        left: 0,
                        behavior: 'smooth',
                    });

                }else{
                    container.scrollTo({
                        left: activeElementOffset-numMinus + activeElementWidth,
                        behavior: 'smooth',
                    });
                }

            }

            if (containerScrollLeft < activeElementOffset) {
                 container.scrollTo({
                    left: activeElementOffset-numPlus,
                    behavior: 'smooth',
                });
            }
        };

        scrollToActiveTab();

    }, [activeTab]);
    useEffect(()=>{
        if(containerRef.current.clientWidth < 992){
            if(containerRef.current.clientWidth < 403){
                document.getElementById("line").style.width = '2065px';
            }else if(containerRef.current.clientWidth >= 403 && containerRef.current.clientWidth <736){
                document.getElementById("line").style.width = '3415px';
            }else if(containerRef.current.clientWidth >=736){
                document.getElementById("line").style.width = '4915px';
            }
        }
    }, [])

    return (
        <div className={styles.sliders} ref={containerRef}>

            <div id={'container'} ref={allContainer} className={clsx(styles.tabLines)}>
                <div className={styles.lineScroll} id={'line'}>
                    <div className={styles.drag} ref={dragRef}></div>
                </div>
                {sliders.map((slide, index) => (
                    <div
                        id={`tab-${index}`}
                        key={index}
                        className={clsx(styles.tab, activeTab === index && styles.active)}
                    >
                        {slide.lineLabel}
                    </div>
                ))}
            </div>
            <div className={styles.slider}>
                <div className={styles.arrows}>
                    <div ref={arrowPrev} className="swiper-button-prev"></div>
                    <div ref={arrowNext} className="swiper-button-next"></div>
                </div>
                <Swiper
                    // onBeforeInit={(swiper) => {
                    //     swiper.params.navigation.prevEl = arrowPrev.current;
                    //     swiper.params.navigation.nextEl = arrowNext.current;
                    // }}
                    navigation={{
                        prevEl: arrowPrev.current,
                        nextEl: arrowNext.current,
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = arrowPrev.current;
                        swiper.params.navigation.nextEl = arrowNext.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
                    initialSlide={2}

                    modules={[Navigation]}
                    className={'heroAboutUs'}
                    ref={swiperRef}
                >

                    {sliders.map((e, _uid) => (
                        <SwiperSlide key={_uid}>
                            {e.descLabel}
                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>
        </div>

    );
};


export default Slider;