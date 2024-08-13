'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const UTMParamsProvider = ({ onUTMParams }) => {
    const params = useSearchParams();
    const [utmParams, setUTMParams] = useState({});

    useEffect(() => {
        const lowerCaseParams = {};
        for (const [key, value] of params.entries()) {
            lowerCaseParams[key.toLowerCase()] = value;
        }
        const utmParams = {};
        if (lowerCaseParams['utm_source']) utmParams.utm_source = lowerCaseParams['utm_source'];
        if (lowerCaseParams['utm_medium']) utmParams.utm_medium = lowerCaseParams['utm_medium'];
        if (lowerCaseParams['utm_campaign']) utmParams.utm_campaign = lowerCaseParams['utm_campaign'];
        if (lowerCaseParams['utm_term']) utmParams.utm_term = lowerCaseParams['utm_term'];
        if (lowerCaseParams['utm_content']) utmParams.utm_content = lowerCaseParams['utm_content'];
        setUTMParams(utmParams);
        onUTMParams(utmParams); // Callback to pass UTM params to parent component
    }, [params]);

    return null; // This component doesn't render anything
};

export default UTMParamsProvider;
