import React from "react";

const Hero = () => {
  return (
    <section className="text-center py-20 bg-gradient-to-r from-landing-gradient-start to-landing-gradient-end text-white">
      <h1 className="text-5xl font-heading mb-6">
        Plan, Track & Ship Projects — The Dev Way
      </h1>
      <p className="text-lg max-w-xl mx-auto">
        StackTrack helps developers and teams manage projects, stages, and tasks
        with ease. Lightweight. Developer-friendly. No clutter.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button className="bg-white text-landing-primary px-6 py-3 rounded-lg font-heading">
          Get Started Free
        </button>
        <button className="border border-white px-6 py-3 rounded-lg font-heading">
          See Dashboard
        </button>
      </div>
    </section>
  );
};

export default Hero;
