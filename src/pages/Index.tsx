import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Services from "@/components/Services";
import Foundations from "@/components/Foundations";
import Video from "@/components/Video";
import { TestimonialSection } from "@/components/ui/testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const testimonialsData = [
  {
    id: 1,
    quote:
      "Brother Sajith's teachings have transformed my understanding of God's grace. His messages bring clarity and hope to my spiritual journey.",
    name: "Sarah Johnson",
    role: "Community Leader",
    imageSrc: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      "The ministry's focus on unity and grace has helped our church community grow closer to Christ and to each other. Truly life-changing!",
    name: "Michael Chen",
    role: "Pastor",
    imageSrc: "https://images.unsplash.com/photo-1690407617542-2f210cf20d7e?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      "Through Sajith's mentorship, I've discovered my purpose in serving God's kingdom. His wisdom and compassion inspire me daily.",
    name: "Emily Rodriguez",
    role: "Youth Minister",
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
      <Foundations />
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
