import { getServerSideSitemap } from 'next-sitemap';
import { fetchData } from '@/lib/api';

export async function GET() {
    const urls = await fetchData('', { per_page: 100, sort_by: 'slug:asc', version: 'published' });

    const url = 'https://www.glgconsult.com/ru/';
    const urlEn = 'https://www.glgconsult.com/en/';
    const object = [];
    const block = ['global', 'blog-contact', 'contacts', 'index', 'about-us'];

    urls.data.stories.forEach((e) => {
        if (!block.includes(e.slug)) {
            object.push({
                loc: url + e.full_slug,
                lastmod: e.published_at,
                changefreq: 'daily',
                priority: 0.7,
            });
        }
    });

    urls.data.stories.forEach((e) => {
        if (!block.includes(e.slug)) {
            object.push({
                loc: urlEn + e.full_slug,
                lastmod: e.published_at,
                changefreq: 'daily',
                priority: 0.7,
            });
        }
    });

    return getServerSideSitemap(object);
}

export const runtime = 'edge';
