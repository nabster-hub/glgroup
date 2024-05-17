import Image from "next/image";
import {getStoryblokApi, StoryblokComponent} from "@storyblok/react/rsc";
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import {fetchData} from "@/lib/api";
import {unstable_setRequestLocale} from "next-intl/server";
import {useLocale} from "next-intl";

export const revalidate = 3600;

export async function generateMetadata({params},parent){
    const locale = params.locale;
    unstable_setRequestLocale(locale);
    // let locale = params.locale;
    // unstable_setRequestLocale(locale);
    const {data} = await fetchData("index", {version: 'draft', language: locale});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
    }
}
export default async function Home({params}) {
    const locale = params.locale;
    unstable_setRequestLocale(locale);
    const {data} = await fetchData("index", {version: 'draft', language: locale});
    return (
          <StoryblokComponent blok={data?.story.content}  />
    );
}
