import React from 'react';
import {StoryblokComponent} from "@storyblok/react/rsc";
import {storyblokEditable} from "@storyblok/react";

const Page = ({blok}) => {
    return (
        <main {...storyblokEditable(blok)}>
            {blok.body.map((nestedBlok) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </main>
    );
};


export default Page;