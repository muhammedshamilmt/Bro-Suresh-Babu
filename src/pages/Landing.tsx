import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import GivingBanners from "@/components/GivingBanners";
import BlogCTA from "@/components/BlogCTA";
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
      <Gallery initialCount={8} />
      <MinistryAccordion />
      <Video />
      <BlogCTA />
      <Footer />
    </div>
  );
};

export default Landing;
