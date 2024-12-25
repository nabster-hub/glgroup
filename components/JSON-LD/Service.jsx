import React from 'react';

const Service = ({into, lang}) => {

    const slug = into.story.full_slug;
    const name = into.story.content.schemaName;
    const description = into.story.content.schemaDescription;
    const type = into.story.content.schemaServiceType;

    const desc = ({lang}) => {
        if (lang === 'ru') {
            return "Цена договорная";
        }else{
            return "Price negotiable";
        }
    }

    const jsonLD = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: name,
        description: description,
        provider: {
            "@type": "Organization",
            name: "Good Luck Group",
            url: "https://www.glgconsult.com/",
            logo: "https://www.glgconsult.com/img/logo.svg",
            telephone: "+62 823 4149 5716",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Jl Bypass Ngurah Rai No 21A",
                addressLocality: "Bali",
            }
        },
        serviceType: type,
        areaServed: {
            "@type": "Place",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Bali",
                streetAddress: "Jl Bypass Ngurah Rai No 21A",
            }
        },
        availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: "https://www.glgconsult.com/"+lang+"/"+slug,
            availableLanguage: ["ru", "en"]
        },
        offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            url: "https://www.glgconsult.com/"+lang+"/"+slug,
            availability: "https://schema.org/InStock",
            validFrom: "2024-12-01",
            description: desc(lang)
        },
    }
    return (
        <div>
            <script
                type={"application/ld+json"}
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLD)}} />
        </div>
    );
};


export default Service;