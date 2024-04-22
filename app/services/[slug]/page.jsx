import React from 'react';
import {fetchData} from "@/lib/api";
import {StoryblokComponent} from "@storyblok/react/rsc";

export const revalidate = 3600;

export async function generateMetadata({params},parent){
    const {data} = await fetchData(`/services/${params.slug}`, {version: 'draft'});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
    }
}

export default async function Page({params}) {
    const {data} = await fetchData(`/services/${params.slug}`, {version: 'draft'});
    console.log(data);
    return (
        <StoryblokComponent blok={data?.story.content} />
    );
}
