import { Layers, BarChart2, ShieldCheck, Smartphone } from "lucide-react";

const Features = () => {
  const features = [
    {
      name: "Structured Projects",
      description:
        "Break projects into clear stages and tasks — no more messy to-do lists.",
      icon: Layers,
    },
    {
      name: "Progress Tracking",
      description:
        "Track completion stage by stage, and see progress at a glance.",
      icon: BarChart2,
    },
    {
      name: "Always Accessible",
      description: "Works across devices so you never lose track.",
      icon: Smartphone,
    },
  ];

  return (
    <section className="py-20 px-6" id="features">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold ">
          Stay organized, from idea to shipped.
        </h2>
        <p className="text-lg text-landing-text-muted max-w-2xl mx-auto pb-8 mt-4">
          StackTrack helps developers plan smarter, track progress, and ship
          faster — stage by stage.
        </p>

        {/* Feature Grid */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 mx-10 md:mx-0 lg:mx-0">
          {features.map((feature, idx) => (
            <div
              key={feature.name}
              className={`p-8 rounded-xl shadow-md hover:shadow-lg transition md:flex lg:flex gap-3
                ${idx === 0 ? "bg-landing-secondary" : "bg-gray-50"}`}
            >
              <div
                className={`flex justify-center items-center w-28 h-16 rounded-xl my-3 p-2 ${
                  idx === 0 ? "bg-white" : "bg-landing-navy"
                }`}
              >
                <feature.icon
                  className="h-10 w-10 mx-auto
                 text-landing-secondary"
                />
              </div>

              <div className="flex flex-col items-start justify-start">
                <h3 className="mt-4 text-xl font-semibold text-left">{feature.name}</h3>
                <p
                  className="mt-2 text-sm text-left
                  "
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
