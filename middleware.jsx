import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {pathnames, locales, localePrefix, defaultLocale} from './config';

function customCreateMiddleware(config){
    const middleware = createMiddleware(config);

    return async (req) => {
        const res = await middleware(req);

        // Если статус ответа 308, изменяем его на 301
        if (res.status === 308 || res.status === 307) {
            const headers = new Headers(res.headers);
            headers.set('Location', res.headers.get('Location'));
            return new NextResponse(null, {
                status: 301,
                headers,
            });
        }

        return res;
    };
}

export default customCreateMiddleware({
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
    localePrefix,
    localeDetection: false,
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(en|ru|id)/:path*','/((?!_next|_vercel|api|.*\\..*).*)']
};