import React from 'react';
import {fetchData} from "@/lib/api";
import {StoryblokComponent} from "@storyblok/react/rsc";
import {useLocale} from "next-intl";

export const revalidate = 3600;

export async function generateMetadata({params},parent){
    const {data} = await fetchData(`/services/index`, {version: 'draft', language: params.locale});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
    }
}

export default async function Page({params}) {
    const locale = useLocale();
    const {data} = await fetchData(`/services/index`, {version: 'draft', language: locale});
    return (
        <StoryblokComponent blok={data?.story.content} />
    );
}
