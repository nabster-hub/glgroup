import React from 'react';
import styles from './ContactForm.module.scss'
import {render} from 'storyblok-rich-text-react-renderer';
import Link from "next/link";

const ContactForm = ({blok}) => {
    return (
        <section className={styles.block}>
            <div className="container py-24">
                <div className="flex gap-20">
                    <div className={styles.leftBlock}>
                        <h2>{blok.titleLeft}</h2>
                        <form action="#" method={"POST"}>
                            <label htmlFor={"name"}>{blok.nameLabel}</label>
                            <input type="text" name={"name"}/>
                            <div className="flex gap-5 mb-12">
                                <div className="">
                                    <label htmlFor={"phone"}>{blok.phoneLabel}</label>
                                    <input type="text" name={"phone"}/>
                                </div>
                                <div className="">
                                    <label htmlFor={"email"}>{blok.emailLabel}</label>
                                    <input type="text" name={"email"}/>
                                </div>

                            </div>
                            <div className="flex gap-11">
                                <button type={'submit'}>{blok.buttonLabel}</button>
                                <div className={styles.text}>{render(blok.text)}</div>
                            </div>

                        </form>
                    </div>
                    <div className={styles.rightBlock}>
                        <div className={styles.line}></div>
                        <div className={styles.contacts}>
                            <span className={styles.title}>{blok.titleRight}</span>
                            <div className={styles.socials}>
                                <Link href={blok.telegramLink} className={styles.soc}>
                                    <i>
                                        <svg width="70" height="60" viewBox="0 0 20.0156 16.7865"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                             >
                                            <path id="Vector"
                                                  d="M18.6646 0.110352L0.934601 6.94739C-0.275391 7.43335 -0.268402 8.1084 0.712616 8.40942L5.26462 9.82935L15.7966 3.18433C16.2946 2.88135 16.7496 3.04443 16.3756 3.37634L7.84262 11.0774L7.84061 11.0774L7.84262 11.0784L7.52859 15.7704C7.98862 15.7704 8.19162 15.5593 8.44962 15.3104L10.6606 13.1604L15.2596 16.5574C16.1076 17.0244 16.7166 16.7844 16.9276 15.7723L19.9466 1.54443C20.2556 0.30542 19.4736 -0.255615 18.6646 0.110352Z"
                                                  fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero"/>
                                        </svg>
                                    </i>
                                    <span>{blok.telegramLabel}</span>
                                </Link>
                                <Link href={blok.whatsappLink} className={styles.soc}>
                                    <i>
                                        <svg width="75" height="75" viewBox="0 0 20.9905 20.968"
                                             fill="none" xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path id="Vector"
                                                  d="M19.4169 4.85803C16.2819 -0.00195312 9.86188 -1.44202 4.89685 1.573C0.0518799 4.58801 -1.50812 11.158 1.62689 16.0031L1.8819 16.3931L0.831848 20.323L4.76184 19.2731L5.15186 19.528C6.84686 20.443 8.69189 20.968 10.5219 20.968C12.4869 20.968 14.4518 20.443 16.1469 19.3931C20.9919 16.243 22.4319 9.80798 19.4169 4.828L19.4169 4.85803ZM16.6719 14.968C16.1469 15.748 15.4869 16.2731 14.5719 16.408C14.0469 16.408 13.3868 16.663 10.7769 15.6281C8.55688 14.578 6.71185 12.868 5.40686 10.903C4.62689 9.98804 4.22186 8.80298 4.10187 7.61804C4.10187 6.56799 4.49188 5.65295 5.15186 4.99304C5.40686 4.73804 5.67688 4.60303 5.93188 4.60303L6.59186 4.60303C6.84686 4.60303 7.11688 4.60303 7.25189 5.12805C7.5069 5.78796 8.16687 7.36304 8.16687 7.49805C8.30188 7.63306 8.24188 8.63806 7.64185 9.20801C7.31189 9.58301 7.25189 9.59802 7.38684 9.86804C7.91187 10.6481 8.5719 11.443 9.21686 12.103C9.99689 12.7631 10.7919 13.288 11.7068 13.678C11.9619 13.813 12.2319 13.813 12.3669 13.543C12.5019 13.288 13.1469 12.6281 13.4169 12.358C13.6719 12.103 13.8069 12.103 14.0768 12.223L16.1769 13.2731C16.4319 13.408 16.7018 13.528 16.8369 13.663C16.9719 14.053 16.9719 14.578 16.7018 14.968L16.6719 14.968Z"
                                                  fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero"/>
                                        </svg>
                                    </i>
                                    <span>{blok.whatsappLable}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;