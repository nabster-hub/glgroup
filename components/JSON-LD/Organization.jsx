import React from 'react';

const Organization = () => {
    const jsonLD = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        brand: "GLG Consult",
        logo: "https://www.glgconsult.com/img/logo.svg",
        name: "Good Luck Group",
        alternateName: "GLG Consult",
        url: "https://www.glgconsult.com",
        sameAs: [
            "https://www.instagram.com/glgroup.consulting",
            "https://www.facebook.com/profile.php?id=61558255602793&mibextid=LQQJ4d",
        ],
        department:[
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Good Luck Group",
                image: "https://www.glgconsult.com/img/logo.svg",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Bali",
                    streetAddress: "Jl Bypass Ngurah Rai No 21A",
                },
                location: {
                    "@type": "Place",
                    geo: {
                        "@type": "GeoCoordinates",
                        "latitude": "-8.761396482633385",
                        "longitude": "115.17952331019157",
                    }
                },
                "telephone": "+62 823 4149 5716"
            }
        ]
    }
    return (
        <div>
            <script
                type={"application/ld+json"}
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLD)}} />
        </div>
    );
};


export default Organization;