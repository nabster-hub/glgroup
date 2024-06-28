import {notFound} from "next/navigation";

const {
    StoryblokClient,
    apiPlugin,
    getStoryblokApi: getStoryblokApiDefault,
    storyblokInit
} = require("@storyblok/react/rsc");

let storyblokApi;

const AppStoryblokInit = () => {
    storyblokInit({
        accessToken: "ZqkBIdpCfAPhrN7glDs1Swtt",
        use: [apiPlugin],
    });

    return getStoryblokApiDefault();
};
export const getStoryblokApi = () => {
    if (storyblokApi !== undefined) return storyblokApi;
    return AppStoryblokInit();
};

export async function fetchData(url, params){
    const storyblokApi = getStoryblokApi();
    const data = storyblokApi.get(`cdn/stories/${url}`, params).then(success => {
        return success
    }).catch((error)=>{
        return null
    });
    return data;

}