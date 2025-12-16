import React from 'react';
import {fetchData} from "@/lib/api";
import {useLocale} from "next-intl";
import {ModalSec} from "@/components/Modal/ModalSec";

const ForModal = async ({locale}) => {

    const contactForm = await fetchData('blog-contact', {version: 'draft', language: locale})
    return (
         <>
             <ModalSec  contactForm={contactForm} />
         </>
    );
};

export default ForModal;