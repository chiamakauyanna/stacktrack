import Navbar from "../components/common/Navbar";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import HowItWorks from "../components/sections/HowItWorks";
import Vision from "../components/sections/Vision";
import CTA from "../components/sections/CTA";
import Footer from "../components/common/Footer";

const Landing = () => {
  return (
    <div className="font-body bg-landing-bg text-landing-text">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Vision />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
