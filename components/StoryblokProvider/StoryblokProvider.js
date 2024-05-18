/** 1. Tag it as a client component */
"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import Page from "@/components/Page";
import hero from "@/components/Hero/Hero";
import slider from "@/components/Slider/Slider";
import twoBlock from "@/components/TwoBlock/TwoBlock";
import title from "@/components/UI/title";
import ImageBlock from "@/components/UI/image";
import Text from "@/components/UI/text";
import Button from "@/components/UI/button";
import Grid from "@/components/Grid/Grid";
import GridItem from "@/components/Grid/GridItem";
import SectionNumber from "@/components/SectionNumber/SectionNumber";
import BlockWithArrow from "@/components/BlockWithArrow/BlockWithArrow";
import OurPartners from "@/components/OurPartners/OurPartners";
import OurRecomendations from "@/components/OurRecomendations/OurRecomendations";
import ContactForm from "@/components/ContactForm/ContactForm";
import OurCases from "@/components/OurCases/OurCases";
import Section from "@/components/Section/Section";
import TwoGrids from "@/components/TwoGrids/twoGrids";
import Steps from "@/components/Steps/Steps";
import ContactMap from "@/components/ContactMap/ContactMap";
import GridWithImage from "@/components/GridWithImage/GridWithImage";
import GridImg from "@/components/GridWithImage/GridImg";
import Contact from "@/components/Contact/Contact";
import FormContact from "@/components/FormContact/FormContact";
import HeroAboutUs from "@/components/HeroAboutUs/HeroAboutUs";
import OurAdvantages from "@/components/OurAdvantages/OurAdvantages";

storyblokInit({
    accessToken: "ZqkBIdpCfAPhrN7glDs1Swtt",
    use: [apiPlugin],
    components:{
        page: Page,
        hero: hero,
        sliderMain: slider,
        twoBlock: twoBlock,
        title: title,
        imageBlock: ImageBlock,
        textBlock: Text,
        buttonBlock: Button,
        grid: Grid,
        gridItem: GridItem,
        sectionNumber: SectionNumber,
        blockWithArrow: BlockWithArrow,
        ourPartners: OurPartners,
        ourRecomendations: OurRecomendations,
        contactForm: ContactForm,
        ourCases: OurCases,
        section: Section,
        twoGrids: TwoGrids,
        steps: Steps,
        contactMap: ContactMap,
        gridWithImage: GridWithImage,
        gridImg: GridImg,
        contact: Contact,
        fromContact: FormContact,
        HeroAboutUs: HeroAboutUs,
        ourAdvantages: OurAdvantages,
    },
});

export default function StoryblokProvider({ children }) {
    return children;
}