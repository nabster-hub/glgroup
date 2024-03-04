import Image from "next/image";
import {getStoryblokApi, StoryblokComponent} from "@storyblok/react/rsc";

export default async function Home() {
    const {data} = await fetchData();
    console.log(data);
  return (
    <>
        <StoryblokComponent blok={data.story.content} />
    </>
  );
}
export async function fetchData(){
    let sbParams = {version: "draft"};

    const storyblokApi = getStoryblokApi();

    let {data} = await storyblokApi.get(`cdn/stories/home`, sbParams);
    let {data: global} = await storyblokApi.get(`cdn/stories/global`);

    return data;
}