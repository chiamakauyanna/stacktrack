import { useState } from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import Logo from "./Logo";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#howitworks", label: "How it works" },
    { href: "#vision", label: "Vision" },
  ];
  return (
    <nav className="flex justify-between items-center py-6 px-8 bg-surface shadow-sm">
      <div className="flex items-center md:gap-12 lg:gap-24">
        {/* Logo */}
        <Logo />
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12 font-heading text-gray-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray hover:text-secondary"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="bg-primary text-surface hover:bg-secondary transition duration-300 ease-in-out px-8 py-2 rounded-xl font-bold text-sm md:text-base">
        <Link to="/login">Login</Link>
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
        <div className="flex flex-col bg-primary shadow-lg rounded-l-lg py-3 px-4 gap-2 text-sm absolute top-20 right-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <div className="bg-navy text-primary px-8 py-2 rounded-full font-bold">
            <Link to="/login">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
