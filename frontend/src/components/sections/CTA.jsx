import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 text-center bg-landing-primary rounded-t-full">
      <h2 className="text-4xl font-heading mb-6">Ready to Ship Faster?</h2>
      <p className="mb-8">
        Join developers using StackTrack to plan, track, and deliver with flow.
      </p>
      <button className="bg-landing-navy text-landing-primary px-8 py-3 rounded-lg font-heading">
        <Link to="/signup">Get Started</Link>
      </button>
    </section>
  );
};

export default CTA;
