import React from 'react';

const History = ({blok}) => {
    //console.log(blok);
    return (
        <section className={"py-24"}>
            <div className={"container"}>
                <h2 className={"text-center mb-11"}>{blok.title}</h2>
                <div className={"flex flex-col items-center gap-4"}>
                    {blok.historyBlock.map((block, _uid) => (
                        <div key={_uid} className={"flex gap-5 md:w-1/2"}>
                            <div className={"text-lg font-bold min-w-[80px] py-2 px-4 rounded-lg bg-amber-200 flex justify-center items-center"}>
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