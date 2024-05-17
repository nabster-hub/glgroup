import React from 'react';
import {storyblokEditable} from "@storyblok/react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import {getStoryblokApi} from "@storyblok/react/rsc";
import PosePreview from "@/components/PostPreview/PosePreview";
import LazyLoadBlog from "@/components/LazyLoadBlog/LazyLoadBlog";
import {getCategory} from "@/lib/category";
import AllCategroyes from "@/components/AllCategoryes/AllCategroyes";


export const revalidate = 3600;
export async function getPosts(params){
    let sbParams = {
        version: "published",
        starts_with: 'blog/',
        filter_query: {
            Category: {
                in: params,
            }
        }
    }

    const storyblokApi = getStoryblokApi();
    let fetch = await storyblokApi.get('cdn/stories/', sbParams);
    return  fetch;
}

export default async function Page ({params}){
    const fetch = await getPosts(params.slug);
    const posts = fetch.data.stories;
    const category = await getCategory();

    const breadcrumbs = [
        {
            link: {
                linktype: '',
                cached_url: '/',
            },
            label: 'Главная',
        },
        {
            link: {
                linktype: '',
                cached_url: '/blog/',
            },
            label: 'Блог',
        }
    ]
    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>

            <section>
                <div className="container pb-24">
                    <h1 className={'mb-5'}>Блог</h1>
                    <AllCategroyes blok={category.data.datasource_entries} active={params.slug}/>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-8">
                        {posts && posts.map((e, _uid)=>(
                            <PosePreview blok={e} key={_uid} />
                        ))}
                    </div>
                    <LazyLoadBlog count={fetch.total} />
                </div>
            </section>
        </>


    );
};
