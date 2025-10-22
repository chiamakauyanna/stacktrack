import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AppHeader = ({ onMenuClick, pageTitle }) => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning 🌤️");
    else if (hour < 18) setGreeting("Good afternoon ☀️");
    else setGreeting("Good evening 🌙");
  }, []);

  // Simulated user profile (replace with real user context)
  const user = {
    name: "Chammy",
    profile: {
      bio: "Full-stack dev who loves smooth UIs",
      avatar: "", // fallback to initials if empty
      role: "Developer",
    },
  };

  const initials = user.name.charAt(0).toUpperCase();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm"
    >
      {/* Gradient bar */}
      <div className="h-0.5 md:h-1 bg-gradient-to-r from-[var(--color-app-gradient-start)] via-[var(--color-app-primary)] to-[var(--color-app-gradient-end)] animate-[gradientMove_6s_ease_infinite] bg-[length:200%_200%]" />


      {/* Main Header Content */}
      <div className="flex justify-between items-center p-4 md:px-6">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-[var(--color-app-primary)]"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>

          <div>
            <h1 className="text-lg font-semibold text-[var(--color-app-primary)]">
  {pageTitle || "Dashboard"}
</h1>


            <p className="text-sm text-[var(--color-app-text-muted)] font-medium">
  {greeting}, {user.name}
</p>

          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Search input */}
          <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-landing-primary)] transition">
            <Search
              size={18}
              className="text-[var(--color-landing-primary)] opacity-70"
            />
            <input
              type="text"
              placeholder="Search projects..."
              className="ml-2 outline-none text-sm text-[var(--color-app-text)] placeholder-gray-400 bg-transparent w-40 md:w-64"
            />
          </div>

          {/* User Avatar */}
          <Link
            to="/dashboard/profile"
            className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[var(--color-landing-primary)] to-[var(--color-landing-secondary)] text-white font-bold shadow-md hover:shadow-lg transition"
            title="Go to Profile"
          >
            {user.profile.avatar ? (
              <img
                src={user.profile.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Gradient Animation */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.header>
  );
};

export default AppHeader;
