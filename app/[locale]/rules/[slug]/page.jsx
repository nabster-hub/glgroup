import React from 'react';
import {fetchData} from "@/lib/api";
import {StoryblokComponent} from "@storyblok/react/rsc";
import {storyblokEditable} from "@storyblok/react";
import Breadcrumbs from "/components/Breadcrumbs/Breadcrumbs";
import {notFound} from "next/navigation";
export const revalidate = 3600;


export async function generateMetadata({params},parent){
    const {data} = await fetchData(`rules/${params.slug}`, {version: 'draft'});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
    }
}
export default async function Page({params}) {
    const {data} = await fetchData(`rules/${params.slug}`, {version: 'draft'});
    console.log(data);
    if(data.status === 404){
        notFound();
    }
    return (
        <>
            <Breadcrumbs links={data?.story.content.breadcrumbs}/>
            <StoryblokComponent blok={data?.story.content}  />
        </>

    );
};

