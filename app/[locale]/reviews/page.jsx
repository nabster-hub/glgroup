import {unstable_setRequestLocale} from "next-intl/server";
import {fetchData} from "@/lib/api";
import Organization from "@/components/JSON-LD/Organization";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import {StoryblokComponent} from "@storyblok/react/rsc";
import React from "react";

export default async function Page({params: {locale}}) {
    unstable_setRequestLocale(locale);
    const {data} = await fetchData("reviews", {version: 'draft', language: locale});
    return (
        <main className={"min-h-[80vh]"}>
            <Breadcrumbs links={data?.story.content.breadcrumbs}/>
            <StoryblokComponent blok={data?.story.content} locale={locale}  />
        </main>

    );
};