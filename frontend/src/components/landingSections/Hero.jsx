import { Link } from "react-router-dom";
import heroImg from "../../assets/deep-thinker-avatar.svg";

const Hero = () => {
  return (
    <section className="bg-surface mx-auto flex flex-col md:flex-row items-center px-6 rounded-br-full h-screen">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left px-2 md:px-10 mt-25 md:mt-0">
        <h1 className="text-3xl md:text-4xl lg:text-6xl md:text-left font-heading mb-6 font-semibold md:-mt-46">
          Stack it. Track it. Ship it.
        </h1>
        <p className="md:text-lg max-w-xl text-text-muted">
          Plan projects, manage tasks, and ship with flow. Stay focused from
          idea to delivery with StackTrack.
        </p>
        <div className="mt-8">
          <button className="bg-primary text-surface px-6 py-3 rounded-full font-heading font-medium hover:bg-gray-100 transition">
            <Link to="/signup">Get Started</Link>
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 mt-12 md:mt-0 flex justify-center">
        <div className="p-8 bg-primary rounded-4xl">
          <img src={heroImg} alt="StackTrack Dashboard" className="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
