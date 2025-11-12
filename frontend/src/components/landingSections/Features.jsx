import { features } from "../../services/data";

const Features = () => {
  return (
    <section className="py-20 md:px-6 px-4 bg-accent/25" id="features">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-xl md:text-4xl mb-4">
          Stay organized, from idea to shipped.
        </h2>
        <p className="mt-6 mb-14 md:text-lg text-text px-3">
          StackTrack helps developers plan smarter, track progress, and ship
          faster.
        </p>

        {/* Feature Grid */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={feature.name}
              className={`p-8 rounded-xl shadow-md hover:shadow-lg transition md:flex lg:flex gap-3
                ${idx === 0 ? "bg-accent font-medium" : "bg-gray-50"}`}
            >
              <div
                className={`flex justify-center items-center w-28 h-16 rounded-xl my-3 p-2 ${
                  idx === 0 ? "bg-white" : "bg-navy"
                }`}
              >
                <feature.icon
                  className="h-10 w-10 mx-auto
                 text-accent"
                />
              </div>

              <div className="flex flex-col items-start justify-start">
                <h3 className="mt-4 md:text-lg lg:text-xl font-heading font-semibold text-left">
                  {feature.name}
                </h3>
                <p
                  className="mt-2 text-sm text-left text-navy
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
