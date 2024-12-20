// import {getStoryblokApi, apiPlugin } from "@storyblok/react/rsc";



const {
    StoryblokClient,
    apiPlugin,
    getStoryblokApi: getStoryblokApiDefault,
    storyblokInit
} = require("@storyblok/react/rsc");

let storyblokApi;

const AppStoryblokInit = () => {
    storyblokInit({
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
        use: [apiPlugin],
    });

    return getStoryblokApiDefault();
};

export const getStoryblokApi = () => {
    if (storyblokApi !== undefined) return storyblokApi;
    return AppStoryblokInit();
};



export async function GET(request){
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page');
    const lang = searchParams.get('lang');
    const query = searchParams.get('query');

    let sbParams = {
        version: "published",
        starts_with: 'blog/',
        page: page,
        per_page: 9,
        language: lang === 'ru' ? 'default' : lang,
        cv:Date.now(),
    }

    if(lang === 'ru'){
        sbParams.filter_query = {
            title:{
                like: decodeURI("*"+query+"*"),
            }
        }
    }else if(lang === 'en'){
        sbParams.filter_query = {
            "title__i18n__en":{
                "like": decodeURI("*"+query+"*"),
            }
        }
    }




    const storyblokApi = getStoryblokApi();
    let fetch = await storyblokApi.get('cdn/stories/', sbParams);

   return  Response.json(fetch.data.stories);

}