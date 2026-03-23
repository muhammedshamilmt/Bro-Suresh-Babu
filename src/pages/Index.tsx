import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Services from "@/components/Services";
import MinistryAccordion from "@/components/MinistryAccordion";
import Video from "@/components/Video";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen p-4">
      <Navbar />
      <Hero />
      <Introduction />
      {/* <Services /> */}
      <MinistryAccordion />
      <Video />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
};

export default Index;
