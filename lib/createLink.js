export async function createLink(link, locale){
    if(locale === 'ru' && link.linktype === 'story'){
        return '/ru/'+link.cached_url;
    }else{
        return link.cached_url;
    }
}