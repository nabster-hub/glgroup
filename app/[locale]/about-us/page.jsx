import React from 'react';
import {fetchData} from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import AuthorPage from "@/components/AutohorPage/AuthorPage";
import {StoryblokComponent} from "@storyblok/react/rsc";
import {unstable_setRequestLocale} from "next-intl/server";

export const revalidate = 3600;
export async function generateMetadata({params},parent){
    const locale = params.locale;
    unstable_setRequestLocale(locale);
    const {data} = await fetchData("about-us", {version: 'draft', language: locale});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
        alternates: {
            canonical: './'
        }
    }
}
export default async function Page({params: {locale}}){
    unstable_setRequestLocale(locale);
    const {data} = await fetchData("about-us", {version: 'draft', language: locale});

    return (
        <>
            <StoryblokComponent blok={data?.story.content}  />
        </>
    );
};