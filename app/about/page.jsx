import Image from "next/image";
import Hero from "@/app/components/Hero/Hero";
import AboutUs from "@/app/components/AboutUs/AboutUs";
import {getStoryblokApi} from "@storyblok/react";

export default async function page() {
    const {data} = await fetchData();
    return (
       <>
           <Hero topmenu={data.story?.content?.linkMenu} />
           <AboutUs />

       </>
    );
}

export async function fetchData() {
    let sbParams = { version: "draft" };

    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/global`, sbParams, {cache: "no-store"});
}