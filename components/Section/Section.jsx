import React from 'react';
import {storyblokEditable} from "@storyblok/react";
import {StoryblokComponent} from "@storyblok/react/rsc";

const Section = ({blok}) => {
    return (
        <section {...storyblokEditable(blok)}>
            <div className="container pb-20 lg:pb-24">
                {blok?.content && blok.content.map((e, _uid)=>(
                    <StoryblokComponent blok={e} key={_uid}/>
                ))}
            </div>
        </section>
    );
};


export default Section;