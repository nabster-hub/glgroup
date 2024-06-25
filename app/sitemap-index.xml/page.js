import { getServerSideSitemapIndex } from 'next-sitemap'
import {fetchData} from "@/lib/api";

export default async function Data(){
    const urls = await fetchData('', {per_page: 100, sort_by: "slug:asc", version: "published"});
    console.log(urls);
    urls.data.stories.map((e, index)=>(
        console.log(e.full_slug)
    ))
}

// export default async function GET(request) {
//     // Method to source urls from cms
//     const urls = await fetchData('');
//     console.log(urls);
//
//     return getServerSideSitemapIndex([
//         'https://example.com/path-1.xml',
//         'https://example.com/path-2.xml',
//     ])
// }