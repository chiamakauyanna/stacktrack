import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
      <h1 className="text-2xl font-heading text-landing-primary">StackTrack</h1>
      <div className="space-x-6">
        <a
          href="#features"
          className="text-landing-text hover:text-landing-primary"
        >
          Features
        </a>
        <a
          href="#pricing"
          className="text-landing-text hover:text-landing-primary"
        >
          Pricing
        </a>
        <a
          href="#vision"
          className="text-landing-text hover:text-landing-primary"
        >
          Vision
        </a>
        <a
          href="#login"
          className="bg-landing-primary text-white px-4 py-2 rounded-lg"
        >
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
