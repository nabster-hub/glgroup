'use client';
import React, {useEffect, useState} from 'react';
import styles from "./ScrollToTop.module.scss";

const ScrollToTop = () =>{
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const toggleVisibility = () => {
        if(window.pageYOffset > 300){
            setIsVisible(true)
        }else{
            setIsVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        }
    }, []);

    return (
        <div>
            <div className={styles.scrollToTop}>
                {isVisible && (
                    <button onClick={scrollToTop} className={styles.button}>
                        <svg width="50px" height="50px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path fill="var(--ci-primary-color, #000000)"
                                  d="M 390.624 150.625 L 256 16 L 121.376 150.625 L 144.004 173.252 L 240.001 77.254 L 240.001 495.236 L 272.001 495.236 L 272.001 77.257 L 367.996 173.252 L 390.624 150.625 Z"
                                  className="ci-primary"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};


export default ScrollToTop;