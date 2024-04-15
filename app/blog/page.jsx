import React from 'react';
import {storyblokEditable} from "@storyblok/react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

const Page = ({params}) => {
    return (
        <section {...storyblokEditable(blok)}>
            <div className="container">
                <Breadcrumbs links={data?.story.content.breadcrumbs}/>
            </div>
        </section>
    );
};


export default Page;