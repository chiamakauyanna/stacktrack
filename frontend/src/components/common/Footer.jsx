import logo from "../../assets/logo.png";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const socialIcons = [
    { icon: <Github size={20} />, label: "GitHub", href: "#" },
    { icon: <Twitter size={20} />, label: "X", href: "#" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
  ];
  return (
    <footer className="relative bg-gradient-to-b from-primary to-secondary text-surface overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center space-y-8">
        {/* Logo + Tagline */}
        <div>
          <img
            src={logo}
            alt="StackTrack logo"
            className="h-14 mx-auto mb-4 bg-surface"
          />
          <p className="text-gray-100/90 max-w-md mx-auto text-sm md:text-base font-light">
            Plan, track, and ship your projects seamlessly — with focus and
            flow.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-sm md:text-base font-medium text-gray-100/90">
          <a
            href="#"
            className="hover:text-white hover:underline underline-offset-4 transition"
          >
            Features
          </a>
          <a
            href="#"
            className="hover:text-white hover:underline underline-offset-4 transition"
          >
            Pricing
          </a>
          <a
            href="#"
            className="hover:text-white hover:underline underline-offset-4 transition"
          >
            Blog
          </a>
          <a
            href="#"
            className="hover:text-white hover:underline underline-offset-4 transition"
          >
            Docs
          </a>
          <a
            href="#"
            className="hover:text-white hover:underline underline-offset-4 transition"
          >
            Support
          </a>
        </div>

        {/* Social Icons */}

        <div className="flex items-center justify-center space-x-6 mt-8">
          {socialIcons.map(({ icon, href, label }, i) => (
            <div
              key={i}
              className="flex justify-center items-center gap-2 hover:text-white transform hover:-translate-y-1 transition duration-300"
            >
              <a
                href={href}
                className="bg-surface rounded-full p-1.5 text-primary"
              >
                {icon}
              </a>
              <p>{label}</p>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-6 text-xs text-gray-100/70 border-t border-white/20 w-full text-center">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">StackTrack</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
