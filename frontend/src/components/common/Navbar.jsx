import { useState } from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#vision", label: "Vision" },
  ];

  return (
    <nav className="flex justify-between items-center py-10 px-8 bg-landing-secondary shadow-sm">
      {/* Logo */}
      <h1 className="text-xl md:text-2xl lg:text-2xl font-heading text-landing-primary">
        StackTrack
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-landing-text hover:text-landing-primary"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#login"
          className="bg-landing-navy text-landing-gradient-end px-8 py-2 rounded-full font-bold text-sm md:text-base"
        >
          Login
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setOpenModal(!openModal)}
        className="md:hidden text-2xl"
        aria-label="Toggle menu"
      >
        {openModal ? <IoIosClose /> : <IoIosMenu />}
      </button>

      {/* Mobile Dropdown */}
      {openModal && (
        <div className="flex flex-col bg-white shadow-lg rounded-l-lg py-3 px-4 gap-2 text-sm absolute top-20 right-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-landing-text hover:text-landing-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#login"
            className="bg-landing-navy text-landing-gradient-end px-8 py-2 rounded-full font-bold"
          >
            Login
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
