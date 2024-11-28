import React from 'react';
import {storyblokEditable} from "@storyblok/react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import {getStoryblokApi} from "@storyblok/react/rsc";
import PosePreview from "@/components/PostPreview/PosePreview";
import LazyLoadBlog from "@/components/LazyLoadBlog/LazyLoadBlog";
import {getCategory} from "@/lib/category";
import AllCategroyes from "@/components/AllCategoryes/AllCategroyes";
import {unstable_setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {fetchData} from "@/lib/api";


export const revalidate = 3600;
export async function generateMetadata({params: {locale}},parent){
    if(locale === 'ru'){
        return{
            title: "Блог",
            description: "",
            alternates: {
                canonical: './'
            },
            openGraph:{
                title: "Блог",
                description: "",
                // images:[
                //     {
                //         url: data.story.content?.metaImage.filename,
                //         alt: data.story.content?.metaImageAlt,
                //     }
                // ],
            },
        }
    }else{
        return{
            title: "Blog",
            description: "",
            alternates: {
                canonical: './'
            },
            openGraph:{
                title: "Blog",
                description: "",
                // images:[
                //     {
                //         url: data.story.content?.metaImage?.filename,
                //         alt: data.story.content?.metaImageAlt,
                //     }
                // ],
            },
        }
    }

}

export async function getPosts(params, locale){
    let sbParams = {
        version: "published",
        starts_with: 'blog/',
        filter_query: {
            Category: {
                in: params,
            }
        },
        language: locale,
    }

    let fetch = await fetchData('', sbParams).then(success => {
        return success
    }).catch((error)=>{
        return null
    });
    return  fetch;
}

export default async function Page ({params, params: {locale}}){
    unstable_setRequestLocale(locale);
    const fetch = await getPosts(params.slug, locale);
    if(fetch.data.stories.length === 0){
        notFound();
    }
    const posts = fetch.data.stories;
    const category = await getCategory(locale);

    const breadcrumbs = [
        {
            link: {
                linktype: '',
                cached_url: '/ru/',
            },
            label: 'Главная',
            _uid: '1'
        },
        {
            link: {
                linktype: '',
                cached_url: '/ru/blog/',
            },
            label: 'Блог',
            _uid: '2'
        }
    ]

    const breadcrumbsEn = [
        {
            link: {
                linktype: '',
                cached_url: '/en/',
            },
            label: 'Home',
            _uid: '1'
        },
        {
            link: {
                linktype: '',
                cached_url: '/en/blog/',
            },
            label: 'Blog',
            _uid: '2'
        }
    ]
    return (
        <>
            <Breadcrumbs links={locale === 'ru' ? breadcrumbs : breadcrumbsEn}/>

            <section>
                <div className="container pb-24">
                    <h1 className={'mb-5'}>{locale === 'ru' ? 'Блог' : 'Blog'}</h1>
                    <AllCategroyes blok={category.data.datasource_entries} active={params.slug} locale={locale}/>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-8">
                        {posts && posts.map((e, _uid)=>(
                            <PosePreview blok={e} key={_uid} locale={locale}/>
                        ))}
                    </div>
                    <LazyLoadBlog count={fetch.headers.total} locale={locale} />
                </div>
            </section>
        </>


    );
};
