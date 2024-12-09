import React from 'react';
import {fetchData} from "@/lib/api";
import {StoryblokComponent} from "@storyblok/react/rsc";
import {storyblokEditable} from "@storyblok/react";
import Breadcrumbs from "/components/Breadcrumbs/Breadcrumbs";
import {unstable_setRequestLocale} from "next-intl/server";
import Organization from "@/components/JSON-LD/Organization";
export const revalidate = 3600;


export async function generateMetadata({params: {locale}}, parent){
    unstable_setRequestLocale(locale);
    const {data} = await fetchData("contacts", {version: 'draft', language: locale});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
        alternates: {
            canonical: './',
            languages: {
                'ru_RU': 'https://www.glgconsult.com/ru/contacts',
                'en_EN': 'https://www.glgconsult.com/en/contacts',
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
export default async function Page({params: {locale}}) {
    unstable_setRequestLocale(locale);
    const {data} = await fetchData("contacts", {version: 'draft', language: locale});
    return (
        <>
            <Organization />
            <Breadcrumbs links={data?.story.content.breadcrumbs}/>
            <StoryblokComponent blok={data?.story.content}  />
        </>

    );
};

