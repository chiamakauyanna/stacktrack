import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 px-10 text-center bg-surface">
      <p className="text-2xl md:text-4xl font-heading text-primary mb-4">
        Ready to Ship Faster?
      </p>
      <p className="mt-6 mb-14 md:text-lg text-text">
        Join developers using StackTrack to plan, track, and deliver with flow.
      </p>
      <Link
        to="/signup"
        className="bg-primary text-surface px-8 py-6 rounded-full font-heading font-medium hover:bg-secondary transition"
      >
        Get Started
      </Link>
    </section>
  );
};

export default CTA;
