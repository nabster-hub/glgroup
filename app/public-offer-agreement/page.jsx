import React from 'react';
import {fetchData} from "@/lib/api";
import {StoryblokComponent} from "@storyblok/react/rsc";
import {storyblokEditable} from "@storyblok/react";
export const revalidate = 3600;
export default async function Page() {
    const {data} = await fetchData("public-offer-agreement", {version: 'draft'});
    return (
        <StoryblokComponent blok={data?.story.content}  />
    );
};

