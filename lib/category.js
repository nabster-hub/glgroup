import {getStoryblokApi, apiPlugin } from "@storyblok/react/rsc";

export async function getCategory(locale){
    const storyblokApi = getStoryblokApi();
    let datasource = locale === 'ru' ? 'category' : 'categoryen';
    let sbParams ={
        datasource: datasource,
    }
    const resultPromise = storyblokApi.get('cdn/datasource_entries', sbParams);

    return resultPromise ;
}