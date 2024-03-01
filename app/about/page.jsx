import Image from "next/image";
import Hero from "@/app/components/Hero/Hero";
import AboutUs from "@/app/components/AboutUs/AboutUs";

export default function page() {
    return (
       <>
            <Hero />
           <AboutUs />
       </>
    );
}