import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-landing-primary max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 rounded-br-full h-screen">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl lg:text-6xl md:text-left font-heading mb-6">
          Stack it. Track it. Ship it.
        </h1>
        <p className="text-lg max-w-xl mx-auto">
          Plan projects, manage tasks, and ship with flow. Stay focused from
          idea to delivery with StackTrack.
        </p>
        <div className="mt-8 flex justify-center md:justify-start gap-4">
          <button className="bg-landing-navy text-landing-primary px-6 py-3 rounded-full font-heading">
            <Link to="/signup">Get Started</Link>
          </button>
          <button className="px-6 py-3 rounded-full font-heading bg-gray-200 text-landing-navy">
            Learn More{" "}
          </button>
        </div>
      </div>

      {/* Right Mockup / Image */}
      <div className="flex-1 mt-12 md:mt-0 flex justify-center">
        <div className="w-full h-64 md:h-80 rounded-full bg-gray-50 flex items-center justify-center">
          {/* Replace this with <img src="..." alt="Vision Design" /> */}
          <span className="text-landing-primary font-semibold">
            [ Your Design Here ]
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
