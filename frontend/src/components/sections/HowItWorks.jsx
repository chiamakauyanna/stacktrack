const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Create a Project",
      desc: "Start with a simple project setup.",
    },
    {
      step: "2",
      title: "Add Stages",
      desc: "Break the project into clear stages.",
    },
    {
      step: "3",
      title: "Add Tasks",
      desc: "Fill each stage with actionable task to track progress.",
    },
    {
      step: "4",
      title: "Track Progress",
      desc: "Monitor completion rates automatically.",
    },
  ];

  return (
    <section id="howitworks" className="py-20 px-6 bg-gray-50 text-center">
      {/* Section Header */}
      <h2 className="text-4xl font-heading text-landing-primary mb-3">
        How StackTrack Works
      </h2>
      <p className="mb-14 text-lg text-landing-text-muted  mx-auto">
        A simple 4-step flow to keep your projects structured and moving
        forward.
      </p>
      <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-6">
        {/* Left Section */}
        <div className="md:flex-1">
          <div className="w-full h-64 md:h-80 rounded-full bg-landing-primary flex items-center justify-center">
            {/* Replace this with <img src="..." alt="Vision Design" /> */}
            <span className="text-landing-primary font-semibold">
              [ Your Design Here ]
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="mx-auto space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-16 h-14 rounded-xl bg-landing-navy mb-2 p-2">
                <p className="text-3xl font-heading text-landing-text-muted mb-4">
                  {s.step}
                </p>
              </div>
              <div className="text-left">
                <p className="text-xl font-heading mb-1">{s.title}</p>
                <p className="text-landing-text-muted">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
