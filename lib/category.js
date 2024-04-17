import {getStoryblokApi, apiPlugin } from "@storyblok/react/rsc";

export async function getCategory(){
    const storyblokApi = getStoryblokApi();
    let sbParams ={
        datasource: "category",
    }
    const resultPromise = storyblokApi.get('cdn/datasource_entries', sbParams);

    return resultPromise ;
}