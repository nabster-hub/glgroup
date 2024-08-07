import React from 'react';
import {fetchData} from "@/lib/api";
import {StoryblokComponent} from "@storyblok/react/rsc";
import {useLocale} from "next-intl";
import {unstable_setRequestLocale} from "next-intl/server";

export const revalidate = 3600;

export async function generateMetadata({params: {locale}},parent){
    unstable_setRequestLocale(locale);
    const {data} = await fetchData(`/services/index`, {version: 'draft', language: locale});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
        alternates: {
            canonical: './'
        }
    }
}

export default async function Page({params: {locale}}) {
    unstable_setRequestLocale(locale);
    const {data} = await fetchData(`/services/index`, {version: 'draft', language: locale});
    return (
        <StoryblokComponent blok={data?.story.content} />
    );
}
