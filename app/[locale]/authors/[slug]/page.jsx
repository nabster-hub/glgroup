import React from 'react';
import {fetchData} from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Post from "@/components/Post/Post";
import AuthorPage from "@/components/AutohorPage/AuthorPage";
import {unstable_setRequestLocale} from "next-intl/server";

export const revalidate = 3600;
export async function generateMetadata({params, params:{locale}}, parent){
    unstable_setRequestLocale(locale);
    const {data} = await fetchData("authors/"+params.slug, {version: 'draft', language: locale});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
    }
}
export default async function Page({params, params:{locale}}){
    unstable_setRequestLocale(locale);
    const {data} = await fetchData("authors/"+params.slug, {version: 'draft', language: locale});

    return (
        <>
            <Breadcrumbs links={data?.story.content.breadcrumbs} author={true}/>
            <AuthorPage blok={data.story.content} />

        </>
    );
};

