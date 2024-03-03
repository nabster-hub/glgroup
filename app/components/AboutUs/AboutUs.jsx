import React from 'react';
import styles from './AboutUs.module.scss';
import Image from "next/image";
import Link from "next/link";


const AboutUs = props => {
    return (
        <section>
            <div className={'container flex flex-col-reverse lg:flex-row pt-24 gap-12 justify-between mb-24'}>
                <div className={styles.textBlock}>
                    <div className={styles.titleBlock}>
                        <span className={styles.subLabel}>О нас</span>
                        <h1 className={'h2'}>GOOD LUCK GROUP</h1>
                    </div>
                    <div className={styles.text}>
                        <p>
                            это международное консалтинговое агентство, предлагающее своим клиентам полный комплекс
                            корпоративных услуг, необходимых для создания успешного бизнеса.
                        </p>
                        <p>
                            Наша команда, имея бэкграунд в сфере международных финансов и корпоративного управления,
                            основала свой бизнес на Бали в 2020 году. Объединив наш опыт и бизнес-возможности, открытые
                            в Индонезии, мы создали уникальный продукт для своих клиентов.
                        </p>
                        <p>
                            <b>Наша миссия</b> – популяризация Индонезии в международном бизнес-сообществе, как
                            перспективно региона для создания и ведения бизнеса, не уступающего в своих
                            возможностях более трендовым юрисдикциям.
                        </p>
                    </div>
                    <div className={styles.buttonBlock}>
                        <Link href={'#'} className={styles.button}>Оставить заявку</Link>
                    </div>
                </div>
                <div className={styles.imageBlock}>
                    <div className={styles.image}>
                        <Image src={'/img/aboutus.png'}
                               fill
                               quality={80}
                               sizes="(max-width: 768px) 50vw,
                                 (max-width: 1200px) 25vw,
                                 25vw"
                               style={{
                                   objectFit: "cover",
                               }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};


export default AboutUs;