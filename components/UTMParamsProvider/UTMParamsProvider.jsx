'use client';

import React, { useEffect, useMemo } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useUserStore } from '@/src/store/userStore';

const UTMParamsProvider = ({ onUTMParams }) => {
    const params = useSearchParams();
    const pathname = usePathname();
    const locale = useLocale();

    const initUser = useUserStore.getState().initUser;
    const setLocaleState = useUserStore.getState().setLocale;

    const search = params?.toString() || '';

    const utm = useMemo(() => {
        const lower = new URLSearchParams(search);
        return {
            utm_source: lower.get('utm_source') || '',
            utm_medium: lower.get('utm_medium') || '',
            utm_campaign: lower.get('utm_campaign') || '',
            utm_term: lower.get('utm_term') || '',
            utm_content: lower.get('utm_content') || '',
        };
    }, [search]);

    useEffect(() => {
        const acceptLang =
            typeof navigator !== 'undefined' ? navigator.language : '';

        const entryPage =
            typeof window !== 'undefined' ? window.location.href : '';

        const referrer =
            typeof document !== 'undefined' ? document.referrer : '';

        initUser({ acceptLang, locale, utm, entryPage, referrer });

        setLocaleState(locale);

        onUTMParams?.(utm);

    }, [pathname, search, locale, utm]);

    return null;
};

export default UTMParamsProvider;
