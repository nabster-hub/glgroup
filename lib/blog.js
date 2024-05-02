import {getStoryblokApi, apiPlugin } from "@storyblok/react/rsc";

export async function fetchBlog(page){

    let sbParams = {
        version: "published",
        starts_with: 'blog/',
        page: page,
        per_page: 9
    }


    const storyblokApi = getStoryblokApi();
    let fetch = await storyblokApi.get('cdn/stories/', sbParams);

    return fetch;

}