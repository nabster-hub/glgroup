import React from 'react';
import {fetchData} from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Post from "@/components/Post/Post";

export async function generateMetadata({params}, parent){
    const {data} = await fetchData("blog/"+params.slug, {version: 'draft'});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
    }
}
export default async function Page({params}){

    const {data} = await fetchData("blog/"+params.slug, {version: 'draft'}, {cache: 'no-store'});

    return (
        <>
            <Breadcrumbs links={data?.story.content.breadcrumbs}/>
                <Post blok={data.story} slug={params.slug} />

        </>
    );
};

