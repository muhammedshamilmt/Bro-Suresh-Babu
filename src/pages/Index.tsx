import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Banner from "@/components/Banner";
import Introduction from "@/components/Introduction";
import Services from "@/components/Services";
import Video from "@/components/Video";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Introduction />
      <Services />
      {/* <Banner /> */}
      <Video />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
