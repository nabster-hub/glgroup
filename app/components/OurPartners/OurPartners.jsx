import React from 'react';
import styles from './OurPartners.module.scss';
import Slider from './Slider';


const OurPartners = ({blok}) => {
    return (
        <section>
            <div className="container py-20 lg:py-32">
                <div className={styles.blockTitle}>
                    <span className={styles.subTitle}>{blok.subTitle}</span>
                    <h2 className={'h2'}>{blok.title}</h2>
                </div>
                <div className={styles.slider}>
                    {blok?.sliders && (
                        <Slider items={blok?.sliders} />
                    )}
                </div>

            </div>
        </section>
    );
};


export default OurPartners;