import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import GivingBanners from "@/components/GivingBanners";
// import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import MinistryAccordion from "@/components/MinistryAccordion";
import Video from "@/components/Video";
import Footer from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen p-3">
      <Navbar />
      <Hero />
      <Introduction />
      <GivingBanners />
      <Gallery/>
      <MinistryAccordion />
      <Video />
      <Footer />
    </div>
  );
};

export default Landing;
