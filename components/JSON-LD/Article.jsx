import React from 'react';


const Article = ({article}) => {
    const title = article.story.content.metaTitle;
    const image = article.story.content.img.filename;
    const datePubliched =  article.story.first_published_at;
    const dateModifeid = article.story.updated_at;
    const id = process.env.SITE_URL+article.story.full_slug;
    const jsonLD = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        "@id" : id,
        headline: title,
        image: image,
        datePubliched: datePubliched,
        dateModifeid: dateModifeid,
    }
    return (
        <div>
            <script
                type={"application/ld+json"}
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLD)}} />
        </div>
    );
};


export default Article;