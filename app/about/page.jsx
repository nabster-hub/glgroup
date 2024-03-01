import Image from "next/image";
import Hero from "@/app/components/Hero/Hero";
import AboutUs from "@/app/components/AboutUs/AboutUs";
import Blocks from "@/app/components/Blocks/Blocks";

export default function page() {
    return (
       <>
           <Hero />
           <AboutUs />
           <Blocks />
       </>
    );
}