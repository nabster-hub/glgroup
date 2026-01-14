import React from 'react';
import AccordionItem from "@/components/Accordion/AccordionItem";

const Accordion = ({blok}) => {
    const {
        title,
        items,
    } = blok;
    return (
        <section className={"pb-16"}>
            <div className={"container mx-auto px-4"}>
                <div className={"lg:w-[764px] mx-auto flex flex-col gap-16"}>
                    <h1 className={"text-5xl text-black/80"}>{title}</h1>
                    <div className={"flex flex-col gap-4"}>
                        {items.map((item, i) => (
                            <AccordionItem question={item.title} answer={item.text} anchor={item.anchorLink} icon={item.icon} key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Accordion;