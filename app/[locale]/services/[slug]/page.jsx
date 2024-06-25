import React from 'react';
import {fetchData} from "@/lib/api";
import {StoryblokComponent} from "@storyblok/react/rsc";
import {unstable_setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

export const revalidate = 3600;

export async function generateMetadata({params, params:{locale}},parent){
    unstable_setRequestLocale(locale);
    const {data} = await fetchData(`/services/${params.slug}`, {version: 'draft', language: locale});

    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
    }
}

export default async function Page({params, params:{locale}}) {
    unstable_setRequestLocale(locale);
    const {data} = await fetchData(`/services/${params.slug}`, {version: 'draft', language: locale});
    if(!data){
        notFound();
    }
    return (
        <StoryblokComponent blok={data?.story.content} />
    );
}
