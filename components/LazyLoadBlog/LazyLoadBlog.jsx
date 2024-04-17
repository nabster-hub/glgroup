'use client';
import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import styles from "./LazyLoadBlog.module.scss";
import {fetchBlog} from "@/lib/blog";

const LazyLoadBlog = ({count}) => {
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(2);
    const [post, setPost] = useState(9);

    // useEffect(async () => {
    //     //  const async data = () => {
    //     //     return await fetchBlog(page);
    //     // }
    // }, [page]);
    return (
        <>
            {load ? (
                <div className={'grid grid-cols-3 gap-y-11 gap-x-8 mt-8'}>

                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-14">
                    <span className={styles.button} onClick={()=>{
                        setLoad(true);
                        setPage(page+1);
                    }
                        }>Показать еще</span>
                    <span className={styles.all}>Вы смотрели {post} из {count} статей</span>
                </div>
            )}

        </>

    );
};


export default LazyLoadBlog;