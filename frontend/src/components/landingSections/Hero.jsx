import { Link } from "react-router-dom";
import heroImg1 from "../../assets/dashboard(Nest Hub Max).png";
import heroImg2 from "../../assets/dashboard(Samsung Galaxy S8+).png";
import heroImg3 from "../../assets/dashboard(Samsung Galaxy A51_71).png";

const Hero = () => {
  return (
    <section className="bg-surface flex flex-col lg:flex-row items-center justify-center mx-10 md:px-16 py-32">
      {/* Text Section */}
      <div className="flex flex-col items-center text-center lg:text-left mb-12 md:mb-20 md:p-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
          <span className="text-secondary">Stack it.</span>Track it.{" "}
          <span className="text-secondary">Ship it.</span>
        </h1>
        <p className="text-lg md:text-xl max-w-xl text-gray-700">
          Plan projects, manage tasks, and ship with flow. Stay focused from
          idea to delivery with StackTrack.
        </p>
        <div className="mt-12 w-full">
          <Link to="/signup">
            <button className="bg-primary text-surface px-6 py-4 rounded-2xl font-heading font-medium hover:bg-gray-100 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Images Section */}
      <div className="flex justify-center items-end gap-3 lg:p-10">
        <div className="shadow-2xl shadow-primary">
          <img
            src={heroImg2}
            alt="Dashboard Mobile"
            className="w-[100px] md:w-[150px] object-contain"
          />
        </div>
        <div className="shadow-2xl shadow-primary">
          <img
            src={heroImg1}
            alt="Dashboard Desktop"
            className="w-[400px] md:w-[600px] object-contain"
          />
        </div>
        <div className="p-1 rounded-xl shadow-2xl shadow-primary bg-gray-800 -ml-8">
          <img
            src={heroImg3}
            alt="Dashboard Mobile"
            className="w-[100px] md:w-[150px] object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
