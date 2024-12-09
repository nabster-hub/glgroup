import React from 'react';


const Article = ({article}) => {

    function formatDateWithTimezone(dateString, offsetHours) {
        // Парсим исходную дату
        const date = new Date(dateString);

        // Получаем текущие значения UTC
        const utcYear = date.getUTCFullYear();
        const utcMonth = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const utcDate = date.getUTCDate().toString().padStart(2, '0');
        const utcHours = date.getUTCHours();
        const utcMinutes = date.getUTCMinutes();
        const utcSeconds = date.getUTCSeconds();

        // Добавляем сдвиг часового пояса
        const localDate = new Date(Date.UTC(
            utcYear,
            date.getUTCMonth(),
            utcDate,
            utcHours + offsetHours,
            utcMinutes,
            utcSeconds
        ));

        // Форматируем дату в нужном формате
        const year = localDate.getFullYear();
        const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
        const day = localDate.getDate().toString().padStart(2, '0');
        const hours = localDate.getHours().toString().padStart(2, '0');
        const minutes = localDate.getMinutes().toString().padStart(2, '0');
        const seconds = localDate.getSeconds().toString().padStart(2, '0');
        const timezoneOffset = `+${offsetHours.toString().padStart(2, '0')}:00`;

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneOffset}`;
    }

    const title = article.story.content.metaTitle;
    const image = article.story.content.img.filename;
    const datePubliched =  formatDateWithTimezone(article.story.first_published_at, 3);
    const dateModifeid = formatDateWithTimezone(article.story.updated_at, 3);
    const id = process.env.SITE_URL+article.story.full_slug;
    const jsonLD = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        "@id" : id,
        headline: title,
        image: image,
        datePublished: datePubliched,
        dateModified: dateModifeid,
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