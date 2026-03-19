import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Services from "@/components/Services";
import Video from "@/components/Video";
import { TestimonialSection } from "@/components/ui/testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const testimonialsData = [
  {
    id: 1,
    quote:
      "Bro. Suresh's ministry completely changed our church. His focus on Gospel truth and practical spiritual transformation brought a new wave of revival to our congregation.",
    name: "Rev. David Smith",
    role: "Senior Pastor",
    imageSrc: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      "The youth camp led by Bro. Suresh Babu was the turning point in my life. I encountered God's grace and found my true calling in serving the community.",
    name: "John Mark",
    role: "Youth Leader",
    imageSrc: "https://images.unsplash.com/photo-1690407617542-2f210cf20d7e?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      "Attending the Argentina conference with 1200+ other churches was a glimpse of heaven. The anointing and clarity in his teaching is unparalleled.",
    name: "Carlos Gomez",
    role: "Conference Attendee",
    imageSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1470&auto=format&fit=crop",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Introduction />
      <Services />
      <Video />
      <TestimonialSection
        title="See What All the Talk Is About!"
        subtitle="Transformative experiences from believers around the globe"
        testimonials={testimonialsData}
      />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
