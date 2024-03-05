import {getStoryblokApi} from "@storyblok/react/rsc";

export async function fetchData(url, params){
    const storyblokApi = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/${url}`, params, {cache: 'no-cache'});
}