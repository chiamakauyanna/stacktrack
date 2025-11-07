import visionImg from "../../assets/group-project.svg";

const Vision = () => {
  return (
    <section id="vision" className="py-24 px-6 bg-accent/25">
      <div className="flex flex-col justify-center items-center mb-14">
        <h2 className="text-2xl md:text-4xl font-heading text-navy mb-4">
          Our Vision
        </h2>
        <div className="w-20 hover:w-32 h-1 bg-accent flex justify-center items-center transition ease-in-out duration-300"></div>
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <div className="flex md:flex-row flex-col items-center justify-center rounded-4xl bg-primary">
            <img
              src={visionImg}
              alt="Vision Illustration"
              className="max-h-2/3 max-w-full opacity-90"
            />
          </div>
        </div>
        <div>
          <p className="text-text leading-relaxed">
            StackTrack was built because developers deserve a tool that feels
            natural — simple enough to set up in minutes, but powerful enough to
            track real progress. Project management should work the way you
            code: lightweight, structured, and efficient.
          </p>
          <p className="mt-4 text-text">
            Whether you’re working solo or in a team, our vision is to keep you
            shipping faster, stage by stage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Vision;
