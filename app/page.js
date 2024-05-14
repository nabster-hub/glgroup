import Image from "next/image";
import {getStoryblokApi, StoryblokComponent} from "@storyblok/react/rsc";
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import {fetchData} from "@/lib/api";

export const revalidate = 3600;

export async function generateMetadata(parent){
    const {data} = await fetchData("index", {version: 'draft'});
    return{
        title: data.story.content.metaTitle,
        description: data.story.content.metaDescription,
    }
}
export default async function Home() {
    const {data} = await fetchData("index", {version: 'draft'});
    return (
          <StoryblokComponent blok={data?.story.content}  />
    );
}
