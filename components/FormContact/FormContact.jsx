import React from 'react';
import styles from './FormContact.module.scss';
import {render} from "storyblok-rich-text-react-renderer";

const FormContact = ({blok}) => {
    return (
        <section className={styles.formContact}>
            <div className="container">
                <div className={styles.contactBlock}>
                    <h2>{blok.title}</h2>
                    <form action="#" method={"POST"}>
                        <label htmlFor={"name"}>{blok.nameLabel}</label>
                        <input type="text" name={"name"}/>
                        <div className={styles.parts}>
                            <div className="">
                                <label htmlFor={"phone"}>{blok.phoneLabel}</label>
                                <input type="text" name={"phone"}/>
                            </div>
                            <div className="">
                                <label htmlFor={"email"}>{blok.emailLabel}</label>
                                <input type="text" name={"email"}/>
                            </div>

                        </div>

                        <div className="">
                            <label htmlFor={"message"}>{blok.massageLabel}</label>
                            <input type={'text'} name={"message"}/>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-7 xl:gap-11">
                            <button type={'submit'}>{blok.buttonLabel}</button>
                            <div className={styles.text}>{render(blok.text)}</div>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
};


export default FormContact;