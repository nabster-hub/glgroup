"use client";

import styles from './OurRecomendations.module.scss'
import Link from "next/link";
import Marquee from "react-fast-marquee";
import {render} from "storyblok-rich-text-react-renderer";

const Slider = ({items}) => {

    return (
        <Marquee className={styles.sliders} autoFill={true} speed={80}>
            {items.map((item, _uid) => (
                <div className={styles.slideContainer} key={_uid}>
                    <span className={styles.quotes}>“</span>
                    <h3>{item.title}</h3>
                    <div className={"prose line-clamp-6"}>
                        {render(item.text)}
                    </div>
                    <div className={"flex justify-end w-full pt-4"}>
                        <Link href={"/reviews/#"+item.anchorLink} className={"bg-[#FFDA2B] border hover:border-black hover:bg-[#FFDA2B]/80 py-2 px-4 rounded-xl"}>{item.linkLabel}</Link>
                    </div>

                </div>
            ))}
        </Marquee>
    );
};


export default Slider;