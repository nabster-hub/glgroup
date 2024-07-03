import React from 'react';
import {storyblokEditable} from "@storyblok/react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import {getStoryblokApi} from "@storyblok/react/rsc";
import PosePreview from "@/components/PostPreview/PosePreview";
import LazyLoadBlog from "@/components/LazyLoadBlog/LazyLoadBlog";
import {getCategory} from "@/lib/category";
import AllCategroyes from "@/components/AllCategoryes/AllCategroyes";
import {fetchBlog} from "@/lib/blog";
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import {unstable_setRequestLocale} from "next-intl/server";
import {fetchData} from "@/lib/api";

export const revalidate = 3600;

export async function generateMetadata({params: {locale}},parent){
    return{
        title: "Блог",
        description: "",
    }
}

export async function getPosts({locale}){
    let sbParams = {
        version: "published",
        starts_with: 'blog/',
        page: 1,
        language: locale,
        per_page: 9
    }

    const storyblokApi = getStoryblokApi();
    let fetch = await storyblokApi.get('cdn/stories/', sbParams);

    return  fetch;
}

export default async function Page ({params: {locale}}){
    unstable_setRequestLocale(locale);
    const fetch = await getPosts(locale);
//    const datas = await fetchBlog(1);
  //  console.log(datas);
    const posts = fetch.data.stories;
    const category = await getCategory(locale);
    console.log(category.data);
    const breadcrumbs = [
        {
            link: {
                linktype: '',
                cached_url: '/ru/',
            },
            label: 'Главная',
        },
        {
            link: {
                linktype: '',
                cached_url: '/en/blog/',
            },
            label: 'Блог',
        }
    ]

    const breadcrumbsEn = [
        {
            link: {
                linktype: '',
                cached_url: '/en/',
            },
            label: 'Home',
        },
        {
            link: {
                linktype: '',
                cached_url: '/en/blog/',
            },
            label: 'Blog',
        }
    ]
    return (
        <>
            <Breadcrumbs links={locale === 'ru' ? breadcrumbs : breadcrumbsEn}/>

            <section>
                <div className="container pb-24">
                    <h1 className={'mb-5'}>{locale === 'ru' ? 'Блог' : 'Blog'}</h1>
                    <AllCategroyes blok={category.data.datasource_entries} />
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

