const Vision = () => {
  return (
    <section id="vision" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="text-left">
          <h2 className="text-4xl font-heading text-landing-primary mb-6">
            Our Vision
          </h2>
          <div className="text-landing-navy leading-relaxed">
            <p>
              We built StackTrack because developers deserve a tool that feels
              natural, simple enough to set up in minutes, but powerful enough
              to track real progress. Project management should work the way you
              code: lightweight, structured, and efficient.
            </p>
            <p className="mt-4">
              Whether you’re working solo or in a team, our vision is to keep
              you shipping faster, stage by stage.
            </p>
          </div>
        </div>

        {/* Right: Image/Design placeholder */}
        <div className="flex justify-center">
          <div className="w-full h-64 md:h-80 rounded-2xl bg-landing-primary flex items-center justify-center">
            {/* Replace this with <img src="..." alt="Vision Design" /> */}
            <span className="text-landing-primary font-semibold">
              [ Your Design Here ]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
