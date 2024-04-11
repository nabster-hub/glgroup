import {getStoryblokApi, apiPlugin } from "@storyblok/react/rsc";

export async function fetchData(url, params){
    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/${url}`, params);
}