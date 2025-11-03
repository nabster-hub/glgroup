import { create } from "zustand";
import { nanoid } from "nanoid";


const TTL = 1000 * 60 * 60 * 24 * 30; // 30 дней

const shallowEqual = (a, b) => {
    if (a === b) return true;
    if (!a || !b) return false;
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) {
        if (a[k] !== b[k]) return false;
    }
    return true;
};

const loadState = () => {
    if (typeof window === "undefined") return null;
    try {
        const data = JSON.parse(localStorage.getItem("userStore"));
        if (!data) return null;
        const isExpired = Date.now() - data.timestamp > TTL;
        if (isExpired) {
            localStorage.removeItem("userStore");
            return null;
        }
        return data;
    } catch {
        return null;
    }
};

const saveState = (state) => {
    if (typeof window === "undefined") return;
    const prev = localStorage.getItem("userStore");
    const next = JSON.stringify({ ...state, timestamp: Date.now() });
    if (prev !== next) {
        localStorage.setItem("userStore", next);
    }
};


export const useUserStore = create((set, get) => ({

    sessionId: "",
    acceptLang: "",
    locale: "",
    utm: {
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_term: "",
        utm_content: "",
    },
    entryPage: "",
    referrer: "",
    isReturning: false,
    formPage: "",
    fromModal: false,

    initUser: ({ acceptLang, locale, utm, entryPage, referrer }) => {
        const curr = get();
        const updates = {};

        if (!curr.sessionId) {
            updates.sessionId = nanoid();
        }

        if (acceptLang && curr.acceptLang !== acceptLang) {
            updates.acceptLang = acceptLang;
        }

        if (!curr.entryPage && entryPage) {
            updates.entryPage = entryPage;
        }
        if (!curr.referrer && referrer) {
            updates.referrer = referrer;
        }

        const hasNewUtm = Object.values(utm || {}).some(Boolean);
        if (hasNewUtm) {
            if (!shallowEqual(curr.utm, utm)) {
                updates.utm = utm;
                updates.isReturning = false;
            }
        } else {
            if (!curr.isReturning && curr.sessionId) {
                updates.isReturning = true;
            }
        }

        if (Object.keys(updates).length) {
            set(updates);
            saveState(get());
        }
    },

    setLocale: (locale) => {
        const curr = get();
        if (curr.locale !== locale) {
            set({ locale });
            saveState(get());
        }
    },

    setFormContext: ({ formPage, fromModal }) => {
        const curr = get();
        const updates = {};
        if (formPage && curr.formPage !== formPage) updates.formPage = formPage;
        if (typeof fromModal === "boolean" && curr.fromModal !== fromModal) {
            updates.fromModal = fromModal;
        }
        if (Object.keys(updates).length) {
            set(updates);
            saveState(get());
        }
    },
}));

const savedState = loadState();
if (savedState) {
    useUserStore.setState((state) => ({
        ...state,
        ...savedState
    }));
}

