'use client';
import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import styles from "./LazyLoadBlog.module.scss";
import {fetchBlog} from "@/lib/blog";
import PosePreview from "@/components/PostPreview/PosePreview";

const LazyLoadBlog = ({count}) => {
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(1);
    const [post, setPost] = useState(9);
    const [data, setData] = useState([]);

    useEffect(() => {
       if(page > 1){
           const getData =async () => {
               try{
                   const response = await fetch(`/api/blog?page=${page}`);
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
                <div className={'grid grid-cols-3 gap-y-11 gap-x-8 mt-8'}>
                    {data.map((e, _uid)=>(
                        <PosePreview blok={e} key={_uid} />
                    ))}
                </div>
            )}
            {count > post ? (
                <div className="flex flex-col items-center justify-center mt-14">
                    <span className={styles.button} onClick={() => {
                        setLoad(true);
                        setPage(page + 1);
                    }
                    }>Показать еще</span>
                    <span className={styles.all}>Вы смотрели {post} из {count} статей</span>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-14">
                     <span className={styles.all}>Вы смотрели {post} из {count} статей</span>
                </div>
            )}

        </>

    );
};


export default LazyLoadBlog;