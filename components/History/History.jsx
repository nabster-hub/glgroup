import React from 'react';

const History = ({blok}) => {
    //console.log(blok);
    return (
        <section className={"py-24"}>
            <div className={"container font-gilroy"}>
                <h2 className={"text-center mb-11"}>{blok.title}</h2>
                <div className={"flex flex-col items-center gap-4"}>
                    {blok.historyBlock.map((block, _uid) => (
                        <div key={_uid} className={"flex gap-5 min-h-[114px] w-full md:min-h-[90px] lg:min-h-0 md:w-1/2 border-b-2 border-black pb-4 last:border-b-0"}>
                            <div className={"text-lg font-bold min-w-[80px] py-2 px-4 rounded-lg bg-[#FFDA2B] flex justify-center items-center"}>
                                {block.year}
                            </div>
                            <div className="">
                                {block.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default History;