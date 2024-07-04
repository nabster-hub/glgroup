import React from 'react';
import {fetchData} from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Post from "@/components/Post/Post";
import {unstable_setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
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
                canonical: './'
            }
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

    return (
        <>
            <Breadcrumbs links={data?.story.content.breadcrumbs}/>
                <Post blok={data.story} slug={params.slug} />

        </>
    );
};

