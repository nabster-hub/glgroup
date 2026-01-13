"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {render} from "storyblok-rich-text-react-renderer";
import styles from "./Accordion.module.scss";

export default function AccordionItem({question, answer, anchor, icon}) {
    const [open, setOpen] = useState(false);

    return (
        <div className={"rounded-3xl bg-[#3B604E] p-6"} id={anchor}>
            <button className={"flex gap-6 justify-between items-center w-full"}
                onClick={() => setOpen(!open)}>
                <h3 className={"font-bold text-xl leading-6 tracking-[0.5px] text-white/80 text-start block"}>{question}</h3>
                <motion.span
                    animate={{rotate: open ? 90 : 0}}
                    transition={{duration: 0.25}}
                    className="w-fit h-fit block"
                >
                    <i className={"rotate-90"}>
                        <svg
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M18.3825 10.7034C18.7205 11.0414 18.9103 11.4999 18.9103 11.9778C18.9103 12.4558 18.7205 12.9143 18.3825 13.2523L8.18515 23.4497C8.01887 23.6219 7.81996 23.7592 7.60003 23.8537C7.3801 23.9481 7.14356 23.9979 6.90422 23.9999C6.66487 24.002 6.4275 23.9564 6.20596 23.8658C5.98443 23.7751 5.78316 23.6413 5.61391 23.472C5.44466 23.3028 5.31081 23.1015 5.22017 22.88C5.12953 22.6584 5.08393 22.4211 5.08601 22.1817C5.08809 21.9424 5.13781 21.7058 5.23229 21.4859C5.32676 21.266 5.46409 21.0671 5.63625 20.9008L14.5592 11.9778L5.63625 3.05491C5.30789 2.71493 5.1262 2.25959 5.13031 1.78695C5.13441 1.31431 5.32399 0.862192 5.65821 0.527973C5.99243 0.193754 6.44455 0.00417525 6.91719 6.81436e-05C7.38983 -0.00403897 7.84517 0.177654 8.18515 0.506015L18.3825 10.7034Z"
                                  fill="#fff"/>
                        </svg>
                    </i>
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                    >
                        <div className={`pt-6 text-white/80 text-lg leading-6 ${styles.answer}`}>
                            {render(answer)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
