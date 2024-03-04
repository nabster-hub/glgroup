import Image from "next/image";
import Hero from "@/app/components/Hero/Hero";
import AboutUs from "@/app/components/AboutUs/AboutUs";
import Blocks from "@/app/components/Blocks/Blocks";
import {getStoryblokApi} from "@storyblok/react";

export default async function page() {
    const {data} = await fetchData();
    return (
       <>
           <Hero topmenu={data.story?.content?.linkMenu} />
           <AboutUs />
           <Blocks />
       </>
    );
}

export async function fetchData() {
    let sbParams = { version: "draft" };

    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/global`, sbParams, {cache: "no-store"});
}