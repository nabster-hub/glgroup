module.exports = {
    siteUrl: 'https://www.glgconsult.com/',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    outDir: './public',
    exclude: ['/sitemap-index.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://www.glgconsult.com/sitemap-index.xml',
        ],
        policies: [
            {
                userAgent: '*',
                disallow: ['/currency/', '/currency', '/currency-converter/', '/currency-converter'],
            }
        ],
    },
}