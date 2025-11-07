import logo from "../../assets/dark-logo.png";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={logo}
              alt="StackTrack logo"
              className="h-14 w-auto"
            />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Plan projects, manage tasks, and ship faster — all in one place.
          </p>
          <div className="flex items-center space-x-4 mt-6">
            <a href="#" aria-label="GitHub" className="hover:text-white transition">
              <Github size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Features</a></li>
            <li><a href="#" className="hover:text-white transition">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition">Integrations</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Docs</a></li>
            <li><a href="#" className="hover:text-white transition">Community</a></li>
            <li><a href="#" className="hover:text-white transition">Support</a></li>
            <li><a href="#" className="hover:text-white transition">API Status</a></li>
          </ul>
        </div>
      </div>

      {/* Divider + Copyright */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} StackTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
