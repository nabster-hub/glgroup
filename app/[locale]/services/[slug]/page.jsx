import React from 'react';
import {fetchData} from "@/lib/api";
import {StoryblokComponent} from "@storyblok/react/rsc";
import {unstable_setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

export const revalidate = 3600;

export async function generateMetadata({params, params:{locale}},parent){
    unstable_setRequestLocale(locale);
    const res = await fetchData(`/services/${params.slug}`, {version: 'draft', language: locale});

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
                    'ru_RU': 'https://www.glgconsult.com/ru/services'+data.story.slug,
                    'en_EN': 'https://www.glgconsult.com/en/services'+data.story.slug,
                },
            },
            openGraph:{
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

export default async function Page({params, params:{locale}}) {
    unstable_setRequestLocale(locale);
    const res = await fetchData(`/services/${params.slug}`, {version: 'draft', language: locale});
    if(!res){
        notFound();
    }
    const {data} = res
    return (
        <StoryblokComponent blok={data?.story.content} />
    );
}
