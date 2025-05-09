'use client';
import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import styles from "./LazyLoadBlog.module.scss";
import {fetchBlog} from "@/lib/blog";
import PosePreview from "@/components/PostPreview/PosePreview";

const LazyLoadBlog = ({count, locale, type}) => {
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(1);
    const [post, setPost] = useState(9);
    const [data, setData] = useState([]);
    if(count < post){
        setPost(count)
    }

    useEffect(() => {
       if(page > 1){
           const getData =async () => {
               try{
                   let url = '';
                   if(!type){
                       url = `/api/blog?page=${page}&lang=${locale}`;
                   }else{
                       url = `/api/searchBlog?page=${page}&lang=${locale}&query=${type}`;
                   }
                   const response = await fetch(url);
                   if(!response.ok){
                       throw new Error("Ошибка HTTP " + response.status);
                   }
                   const responseData = await response.json();
                   setData(prevState => [...prevState, ...responseData]);
                   setPost(post + responseData.length)
               }catch (e){
                   console.error("error get data", e);
               }
           }
           getData()
       }

    }, [page]);

    return (
        <>
            {data?.length > 0 && (
                <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-8'}>
                    {data.map((e, _uid)=>(
                        <PosePreview blok={e} key={_uid} locale={locale}/>
                    ))}
                </div>
            )}
            {count > post ? (
                <div className="flex flex-col items-center justify-center mt-14">
                    <span className={styles.button} onClick={() => {
                        setLoad(true);
                        setPage(page + 1);
                    }
                    }>{locale === 'ru' ? "Показать еще" : 'Show more'}</span>
                    <span className={styles.all}>{locale === 'ru' ? `Вы смотрели ${post} из ${count} статей` : ` You’ve scrolled ${post} articles out of ${count} `}</span>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-14">
                     <span className={styles.all}>{locale === 'ru' ? `Вы смотрели ${post} из ${count} статей` : ` You’ve scrolled ${post} articles out of ${count} `}</span>
                </div>
            )}

        </>

    );
};


export default LazyLoadBlog;