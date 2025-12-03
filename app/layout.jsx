import './globals.css';
import {apiPlugin, storyblokInit} from "@storyblok/react/rsc";
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
import History from "@/components/History/History";
import staticHeroForConverter from "@/components/staticHeroForConverter/staticHeroForConverter";
import OrderConsultation from "@/components/OrderConsultation/OrderConsultation";
import ExchangeDashboardMainServer from "@/components/ExchangeDashboardMain/ExchangeDashboardMainServer";
import ExchangeDashboardBankServer from "@/components/ExchangeDashboardBank/ExchangeDashboardBankServer";
import Converter from "@/components/Converter/Converter";
import ServicesList from "@/components/ServicesList/ServicesList";
import singleBankInfo from "@/components/singleBankInfo/singleBankInfo";
import BankExchangeList from "@/components/BankExchangeList/BankExchangeList";
import InfoByCurrency from "@/components/InfoByCurrency/InfoByCurrency";
import SingleCurrencyTableServer from "../components/SingleCurrencyTable/SingleCurrencyTableServer";

storyblokInit({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
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
        history: History,
        staticHeroForConverter: staticHeroForConverter,
        OrderConsultation: OrderConsultation,
        ExchangeDashboardMain: ExchangeDashboardMainServer,
        ExchangeDashboardBank: ExchangeDashboardBankServer,
        Converter: Converter,
        ServicesList: ServicesList,
        singleBankInfo: singleBankInfo,
        BankExchangeList: BankExchangeList,
        InfoByCurrency: InfoByCurrency,
        SingleCurrencyTable: SingleCurrencyTableServer,
    },
});
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({children}) {
    return children;
}