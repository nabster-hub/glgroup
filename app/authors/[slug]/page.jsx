import React from 'react';
import {fetchData} from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Post from "@/components/Post/Post";
import AuthorPage from "@/components/AutohorPage/AuthorPage";

export async function generateMetadata({params}, parent){
    const {data} = await fetchData("authors/"+params.slug, {version: 'draft'});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
    }
}
export default async function Page({params}){

    const {data} = await fetchData("authors/"+params.slug, {version: 'draft'}, {cache: 'no-store'});

    return (
        <>
            <Breadcrumbs links={data?.story.content.breadcrumbs} author={true}/>
            <AuthorPage blok={data.story.content} />

        </>
    );
};

