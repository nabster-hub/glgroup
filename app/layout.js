import { Inter, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import clsx from "clsx";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokProvider from "@/app/components/StoryblokProvider/StoryblokProvider";

import hero from '/app/components/Hero/Hero';
import slider from '/app/components/Slider/Slider';
import twoBlock from "@/app/components/TwoBlock/TwoBlock";
import StoryblokBridgeLoader from "@storyblok/react/bridge-loader";
import Page from '/app/components/Page';
import {fetchData} from "@/lib/api";
import Header from "@/app/components/header/header";
import Menu from "@/app/components/menu/menu";
import title from "@/app/components/UI/title";
import ImageBlock from "@/app/components/UI/image";
import Text from "@/app/components/UI/text";
import Button from "@/app/components/UI/button";
import Grid from "@/app/components/Grid/Grid";
import GridItem from "@/app/components/Grid/GridItem";
import SectionNumber from "@/app/components/SectionNumber/SectionNumber";
import BlockWithArrow from "@/app/components/BlockWithArrow/BlockWithArrow";
import Footer from "@/app/components/Footer/Footer";
import OurPartners from "@/app/components/OurPartners/OurPartners";
import OurRecomendations from "@/app/components/OurRecomendations/OurRecomendations";
import ContactForm from "@/app/components/ContactForm/ContactForm";
import OurCases from "@/app/components/OurCases/OurCases";
 storyblokInit({
   accessToken: "QCEnT1MvvTAhJdyMDjYiXgtt",
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
   },
 });
const inter = Inter({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

const Formular = localFont({
  src: [
    {
      path: './fonts/Formular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: './fonts/Formular-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/Formular-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: './fonts/Formular-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: './fonts/Formular-Italic.woff2',
      weight: 'normal',
      style: 'italic',
    },
    {
      path: './fonts/Formular-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Formular-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/Formular-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/Formular-Medium.woff2',
      weight: '500',
      style: 'normal',
    },

  ],
  variable: '--font-formular',
});

const Gilroy = localFont({
  src: [
    {
      path: './fonts/Gilroy-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-ExtraboldItalic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-UltraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-RegularItalic.woff2',
      weight: 'normal',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-HeavyItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-Extrabold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-BoldItalic.woff2',
      weight: 'bold',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-UltraLightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/Gilroy-Heavy.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/Gilroy-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
  ],
  variable: '--font-gilroy',
})

export const metadata = {
  title: "GLGroup - start your business in Indonesia",
  description: "Good Luck Group start your business in Indonesia",
};

export default async function RootLayout({ children }) {
  const global = await fetchData('global', {version: 'draft'})
  const headMenu = global.data.story?.content.linkMenu[0];
  const menu = global.data.story?.content.linkMenu[1];
  return (
    <html lang="en">
      <body className={clsx(inter.className, Gilroy.variable, Formular.variable)}>
      <header className={'absolute top-0  w-full z-10'}>
        <Header links={headMenu}/>
        <Menu menu={menu}/>
      </header>
      {children}
      <footer className={'bg-[#3B604E]'}>
          <Footer links={headMenu} sitename={menu?.siteName} desc={menu?.siteDescription}/>
      </footer>
      </body>
      <StoryblokBridgeLoader options={{}} />
    </html>
  );
}
