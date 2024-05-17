import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['ru', 'en'],

    // Used when no locale matches
    defaultLocale: 'ru',
    localePrefix: 'always',
    alternateLinks: false
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(en|ru)/:path*','/((?!_next|_vercel|.*\\..*).*)']
};