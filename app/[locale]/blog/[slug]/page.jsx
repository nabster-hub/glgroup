import React from 'react';
import {fetchData} from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Post from "@/components/Post/Post";
import {unstable_setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import Article from "@/components/JSON-LD/Article";
export const revalidate = 3600;
export async function generateMetadata({params, params: {locale}}, parent){
    unstable_setRequestLocale(locale);
    const res = await fetchData("blog/"+params.slug, {version: 'draft', language: locale});
    if(!res){
        return {
            title: "Page not found",
            description: "Page not found",
        }
    }else{
        const {data} = res
        return{
            title: data.story.content.metaTitle,
            description: data.story.content.metaDescription,
            alternates: {
                canonical: './',
                languages: {
                    'ru_RU': 'https://www.glgconsult.com/ru/blog/'+data.story.slug,
                    'en_EN': 'https://www.glgconsult.com/en/blog/'+data.story.slug,
                },
            },
            openGraph:{
                siteName: "GLG Consult",
                title: data.story.content.metaTitle,
                description: data.story.content.metaDescription,
                images:[
                    {
                        url: data.story.content?.metaImage?.filename,
                        alt: data.story.content?.metaImageAlt,
                    }
                ],
            },
        }
    }
}
export default async function Page({params, params: {locale}}){
    unstable_setRequestLocale(locale);
    const res = await fetchData("blog/"+params.slug, {version: 'draft', language: locale});

    if(!res){
        notFound()
    }
    const {data} = res
    //console.log(data);
    return (
        <>
            <Article article={data} />
            <Breadcrumbs links={data?.story.content.breadcrumbs}/>
                <Post blok={data.story} slug={params.slug} />

        </>
    );
};

