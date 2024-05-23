import createMiddleware from 'next-intl/middleware';
import {pathnames, locales, localePrefix, defaultLocale} from './config';

export default createMiddleware({
    // A list of all locales that are supported
    // locales: ['ru', 'en'],
    //
    // // Used when no locale matches
    // defaultLocale: 'ru',
    // localePrefix: 'always',
    // alternateLinks: false
    defaultLocale,
    locales,
    pathnames,
    localePrefix
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(en|ru)/:path*','/((?!_next|_vercel|.*\\..*).*)']
};