import React from 'react';
import {fetchData} from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import AuthorPage from "@/components/AutohorPage/AuthorPage";
import {StoryblokComponent} from "@storyblok/react/rsc";


export async function generateMetadata(parent){
    const {data} = await fetchData("about-us", {version: 'draft'});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
    }
}
export default async function Page(){

    const {data} = await fetchData("about-us", {version: 'draft'}, {cache: 'no-store'});

    return (
        <>
            <StoryblokComponent blok={data?.story.content}  />
        </>
    );
};