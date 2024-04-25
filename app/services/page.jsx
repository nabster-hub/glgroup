import React from 'react';
import {fetchData} from "@/lib/api";
import {StoryblokComponent} from "@storyblok/react/rsc";

export const revalidate = 3600;

export async function generateMetadata({params},parent){
    const {data} = await fetchData(`/services/index`, {version: 'draft'});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
    }
}

export default async function Page({params}) {
    const {data} = await fetchData(`/services/index`, {version: 'draft'});
    return (
        <StoryblokComponent blok={data?.story.content} />
    );
}
