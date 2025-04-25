import React from 'react';
import styles from './Post.module.scss';
import Link from "next/link";
import {getStoryblokApi, StoryblokComponent} from "@storyblok/react/rsc";
import Image from "next/image";
import Share from "@/components/Share/Share";
import ContactForm from "@/components/ContactForm/ContactForm";
import {fetchData} from "@/lib/api";
import OtherArticles from "@/components/OtherArticles/OtherArticles";
import {storyblokEditable} from "@storyblok/react";
import {useLocale} from "next-intl";
import {findAnchors} from "@/lib/findAnchors";
import textStyles from '@/components/UI/UI.module.scss';

export async function getData(title, locale, category){
    let sbParams = {
        version: "published",
        starts_with: 'blog/',
        language: locale,
        page: 1,
        per_page: 3,
        filter_query:{
            title:{
                not_in: title
            },
            Category: {
                in: '1'
            }
        }

    }

    const storyblokApi = getStoryblokApi();
    let fetch = await storyblokApi.get('cdn/stories/', sbParams);

    return  fetch;
}

export default async function Post ({blok}) {
    const locale = useLocale();
    const date = new Date(blok.published_at);
    const create  = new Date(blok.created_at);
    const contactForm = await fetchData('blog-contact', {version: 'draft', language: locale})
    const posts = await getData(blok.content.title, locale, blok.content.Category);
    const formattedDate = date.toLocaleDateString(`${locale}`, {day: 'numeric', month: 'long', year: 'numeric'});
    const created_at = create.toLocaleDateString(`${locale}`, {day: 'numeric', month: 'long', year: 'numeric'});
    const anchors = findAnchors(blok.content.textBlocks)


    const createLink = (link) => {
        if(locale === 'ru' && link.linktype === 'story'){
            return '/ru/'+link.cached_url;
        }else{
            return link.cached_url;
        }
    }
    return (
        <section {...storyblokEditable(blok)}>
            <div itemScope itemType="https://schema.org/NewsArticle" className={"hidden"}>
                <div itemProp="headline">{blok.content.title}</div>
                <img itemProp="image" src={blok.content.img.filename}/>
                <div>
                    <span itemProp="datePublished" content={blok.created_at}>
                      {created_at}
                    </span>
                    (last modified
                    <span itemProp="dateModified" content={blok.published_at}>
                      {formattedDate}
                    </span>
                    )
                </div>
            </div>
            <div className="container pb-24 flex-col flex md:flex-row gap-4">
                <div className="md:min-w-[59%] xl:min-w-[1000px]">
                    <h1 className={'h1 mb-5 xl:mb-4'}>{blok.content.title}</h1>
                    <div className="flex gap-8 items-center mb-5 xl:mb-10 ">
                        <span className={styles.date}>{formattedDate}</span>
                        {blok.content.showAuthor && (
                            <Link href={createLink(blok.content.Author)}
                                  className={styles.author}>{blok.content.authorLabel}</Link>
                        )}

                    </div>
                    <div className={styles.img}>
                        <Image src={blok.content.img.filename} alt={blok.content.img.alt}
                               fill
                               quality={90}
                               sizes="(max-width: 768px) 50vw,
                                 (max-width: 1200px) 75vw,
                                 50vw"
                               style={{
                                   objectFit: "cover",
                               }}
                        />
                    </div>
                    {/*{anchors.length !== 0 && (*/}
                    {/*    <div className={"mb-16"}>*/}
                    {/*        <div className={styles.contentArticles}>*/}
                    {/*            <span className={"h2 mb-6 block"}>{locale === 'ru' ? "Содержание" : "Content"}</span>*/}
                    {/*            <ol className={styles.listLinks}>*/}
                    {/*                {anchors.map((anchor, index) => (*/}
                    {/*                    <li key={index}><Link href={`#${anchor.marks[0].attrs.id}`}>{anchor.text}</Link>*/}
                    {/*                    </li>*/}
                    {/*                ))}*/}
                    {/*            </ol>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    <div className={"mb-16"}>
                        {blok.content.textBlocks && blok.content.textBlocks.map((e, _uid) => (
                            <StoryblokComponent blok={e} key={_uid}/>
                        ))}
                    </div>
                    <Share/>
                </div>
                <div className={"relative"}>
                    <div className="sticky top-20 pt-3">
                        {anchors.length !== 0 && (
                            <div className={"hidden md:block mb-8"}>
                                <div className={styles.contentArticles}>
                                    <span className={"h3 mb-6 block"}>{locale === 'ru' ? "Содержание" : "Content"}</span>
                                    <ol className={styles.listLinks}>
                                        {anchors.map((anchor, index) => (
                                            <li key={index}><Link href={`#${anchor.marks[0].attrs.id}`}>{anchor.text}</Link>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        )}
                        {blok.content.showAuthor && (
                            <Link href={createLink(blok.content.Author)}
                                  className={styles.author}>{blok.content.authorLabel}</Link>
                        )}
                        <OtherArticles posts={posts.data.stories}/>
                    </div>
                </div>
            </div>
            <ContactForm blok={contactForm.data.story.content.body[0]}/>
            {/*<OtherArticles posts={posts.data.stories}/>*/}
        </section>
    );
};


