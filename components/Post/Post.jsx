import React from 'react';
import styles from './Post.module.scss';
import Link from "next/link";
import {getStoryblokApi, StoryblokComponent} from "@storyblok/react/rsc";
import Image from "next/image";
import Share from "@/components/Share/Share";
import ContactForm from "@/components/ContactForm/ContactForm";
import {fetchData} from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import OtherArticles from "@/components/OtherArticles/OtherArticles";


export async function getData(title){
    let sbParams = {
        version: "published",
        starts_with: 'blog/',
        page: 1,
        per_page: 6,
        filter_query:{
            title:{
                not_in: title
            }
        }

    }

    const storyblokApi = getStoryblokApi();
    let fetch = await storyblokApi.get('cdn/stories/', sbParams);

    return  fetch;
}

export default async function Post ({blok}) {
    const date = new Date(blok.published_at);
    const contactForm = await fetchData('blog-contact', {version: 'draft'})
    const posts = await getData(blok.content.title);
    const formattedDate = date.toLocaleDateString("ru", {day: 'numeric', month: 'long', year: 'numeric'});
    // console.log(blok)
    return (
        <section>
            <div className="container pb-24">
                <h1 className={'h1 mb-5 xl:mb-4'}>{blok.content.title}</h1>
                <div className="flex gap-8 items-center mb-5 xl:mb-10 ">
                    <span className={styles.date}>{formattedDate}</span>
                    {blok.content.showAuthor && (
                        <Link href={blok.content.Author.linktype === 'story' ? '/'+blok.content.Author.cached_url : blok.content.Author.cached_url} className={styles.author}>{blok.content.authorLabel}</Link>
                    )}

                </div>
                <div className={styles.img}>
                    <Image src={blok.content.img.filename} alt={blok.content.img.alt}
                        fill
                           quality={80}
                           sizes="(max-width: 768px) 50vw,
                                 (max-width: 1200px) 25vw,
                                 25vw"
                           style={{
                               objectFit: "cover",
                           }}
                    />
                </div>
                <div className={"mb-16"}>
                    {blok.content.textBlocks && blok.content.textBlocks.map((e, _uid)=>(
                        <StoryblokComponent blok={e} key={_uid} />
                    ))}
                </div>
                <Share />
            </div>
            <ContactForm blok={contactForm.data.story.content.body[0]}/>
            <OtherArticles posts={posts.data.stories} />
        </section>
    );
};


