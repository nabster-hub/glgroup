import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { pathnames, locales, localePrefix, defaultLocale } from './config';

const USERNAME = process.env.BASIC_AUTH_USER || 'admin';
const PASSWORD = process.env.BASIC_AUTH_PASSWORD || '1234';

function customCreateMiddleware(config) {
    const middleware = createMiddleware(config);

    return async (req) => {
        const url = req.nextUrl.clone();
        const pathname = url.pathname;

        // Пропускаємо статичні файли та API
        if (
            pathname.startsWith('/_next') ||
            pathname.startsWith('/api') ||
            pathname.match(/\.(.*)$/)
        ) {
            return middleware(req);
        }

        // Basic Auth для всього сайту
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return new NextResponse('Authentication required', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Secure Area"',
                },
            });
        }

        const [scheme, encoded] = authHeader.split(' ');
        if (scheme !== 'Basic') {
            return new NextResponse('Bad authentication scheme', { status: 400 });
        }

        const decoded = Buffer.from(encoded, 'base64').toString();
        const [user, pass] = decoded.split(':');

        if (user !== USERNAME || pass !== PASSWORD) {
            return new NextResponse('Invalid credentials', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Secure Area"',
                },
            });
        }

        // Далі викликаємо стандартний next-intl middleware
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
    defaultLocale,
    locales,
    pathnames,
    localePrefix,
    localeDetection: false,
});

export const config = {
    matcher: ['/', '/(en|ru|id)/:path*', '/((?!_next|_vercel|api|.*\\..*).*)'],
};