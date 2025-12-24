'use client';


import {useModalContact} from "@/src/store/modalContactStore";

const ButtonCta = ({blok}) => {
    const {open} = useModalContact();

    const {
        title,
        description,
        linkLabel
    } = blok;
    console.log(blok);
    return (
        <div
            className={"w-full flex flex-col gap-3 text-lg font-medium font-gilroy items-center bg-black rounded-xl p-3 text-white mb-7"}>
            <h3 className={"text-2xl text-white text-center"}>{title}</h3>
            <p className={"text-center"}>{description}</p>
            <button
                onClick={() => open({source: 'CTA'})}
                className={"bg-yellow-400 py-2 px-3 rounded-xl hover:bg-yellow-300 cursor-pointer font-bold text-black"}>{linkLabel}</button>
        </div>
    );
};

export default ButtonCta;