import Image from "next/image";
import Header from "../components/header/header";
import Menu from "@/app/components/menu/menu";

export default function page() {
    return (
       <>
           <Header />
           <Menu />
       </>
    );
}