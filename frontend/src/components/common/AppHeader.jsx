import { useEffect, useState } from "react";
import { Menu, Search, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../../store/useAuthStore";

const AppHeader = ({ onMenuClick, pageTitle }) => {
  const { user, logout } = useAuthStore();
  const [greeting, setGreeting] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  // Determine greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning 🌤️");
    else if (hour < 18) setGreeting("Good afternoon ☀️");
    else setGreeting("Good evening 🌙");
  }, []);

  const initials = user?.username?.charAt(0)?.toUpperCase() || "?";

  const handleLogout = () => {
    logout(); 
    navigate("/login");
    setShowUserMenu(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm"
    >
      {/* Gradient bar */}
      <div className="h-0.5 md:h-1 bg-gradient-to-r from-[var(--color-app-gradient-start)] via-[var(--color-app-primary)] to-[var(--color-app-gradient-end)] animate-[gradientMove_6s_ease_infinite] bg-[length:200%_200%]" />

      {/* Main header */}
      <div className="flex justify-between items-center p-4 md:px-6">
        {/* Left: Menu + Page Title */}
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
              {greeting}, {user?.username || "Guest"}
            </p>
          </div>
        </div>

        {/* Right: Search + Avatar */}
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
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

          {/* Mobile Search Toggle */}
          <button
            className="sm:hidden text-[var(--color-app-primary)]"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>

          <AnimatePresence>
            {showMobileSearch && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-16 left-4 right-4 sm:hidden bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-md z-50"
              >
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full outline-none text-sm text-[var(--color-app-text)] placeholder-gray-400 bg-transparent"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* User Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[var(--color-landing-primary)] to-[var(--color-landing-secondary)] text-white font-bold shadow-md hover:shadow-lg transition"
              title="User Menu"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <Link
                    to="/dashboard/profile"
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User size={16} /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Gradient animation */}
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
