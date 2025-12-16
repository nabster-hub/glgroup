"use client";

import {useEffect, useState} from "react";

export function useScrolledPastHero(offset = 0) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > window.innerHeight);
        };
        window.addEventListener('scroll', onScroll, {passive: true});
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return scrolled;
}