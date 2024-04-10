import React from 'react';
import {fetchData} from "@/lib/api";
import {StoryblokComponent} from "@storyblok/react/rsc";
import {storyblokEditable} from "@storyblok/react";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
export const revalidate = 3600;
export default async function Page() {
    const {data} = await fetchData("rules/privacy-policy", {version: 'draft'});
    return (
        <>
            <Breadcrumbs links={data?.story.content.breadcrumbs}/>
            <StoryblokComponent blok={data?.story.content}  />
        </>

    );
};

