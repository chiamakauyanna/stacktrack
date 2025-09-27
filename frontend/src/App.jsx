import Hero from "./components/sections/Hero";
import ProblemSolution from "./components/sections/ProblemSolution";
import Features from "./components/sections/Features";
import HowItWorks from "./components/sections/HowItWorks";
import Pricing from "./components/sections/Pricing";
import CTA from "./components/sections/CTA";
import Footer from "./components/sections/Footer";
import Navbar from "./components/common/Navbar";
import Vision from "./components/sections/Vision";

function App() {
  return (
    <div className="font-body bg-landing-bg text-landing-text">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Pricing />
      <Vision />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
