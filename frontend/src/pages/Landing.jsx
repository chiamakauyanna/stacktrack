import Navbar from "../components/common/Navbar";
import Hero from "../components/landingSections/Hero";
import Features from "../components/landingSections/Features";
import HowItWorks from "../components/landingSections/HowItWorks";
import Vision from "../components/landingSections/Vision";
import CTA from "../components/landingSections/CTA";
import Footer from "../components/common/Footer";

const Landing = () => {
  return (
    <div className="font-body bg-surface text-text">
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
