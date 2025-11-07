import { steps } from "../../services/data";
import worksImg from "../../assets/work-in-progress.svg";

const HowItWorks = () => {
  return (
    <section id="howitworks" className="py-20 px-6 bg-surface text-center">
      {/* Section Header */}
      <div className="flex flex-col justify-center items-center mb-8">
        <p className="text-2xl md:text-4xl font-heading text-primary mb-2">
          How StackTrack Works
        </p>
        <div className="w-20 hover:w-32 h-1 bg-primary flex justify-center items-center transition ease-in-out duration-300"></div>
        <p className="mt-10 mb-14 md:text-lg text-text">
          A simple 4-step flow to keep your projects structured and moving
          forward.
        </p>
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-between lg:gap-6 gap-12 items-center">
        {/* Left Section */}
        <div className="mx-auto space-y-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-6 md:gap-8">
              <div className="flex-none w-16 min-h-[56px] flex items-center justify-center rounded-xl bg-navy p-2">
                <p className="text-2xl lg:text-3xl font-heading text-surface/50 m-0">
                  {s.step}
                </p>
              </div>
              <div className="flex-1 text-left">
                <p className="md:text-lg lg:text-xl font-heading mb-2 text-primary font-semibold">
                  {s.title}
                </p>
                <p className="text-text text-sm lg:text-base font-medium whitespace-normal break-words">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex md:flex-row flex-col items-center justify-center bg-primary rounded-4xl py-4">
          <img
            src={worksImg}
            alt="Process Illustration"
            className="max-w-1/2"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
