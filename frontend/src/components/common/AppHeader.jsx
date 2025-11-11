import { MoreVertical, User, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import useDashboardLayout from "../../hooks/useDashboardLayout";

const AppHeader = ({ onMenuClick }) => {
  const { user, showUserMenu, setShowUserMenu, initials, handleLogout } =
    useDashboardLayout();

  return (
    <header className="sticky top-0 z-10 bg-surface backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex justify-between items-center p-4 md:px-8 transition-all duration-300">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            aria-label="Toggle menu"
            className="text-primary hover:bg-gray-100 p-2 rounded-lg transition md:hidden"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Logo />
        </div>

        {/* Right Section */}
        <div className="relative flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center bg-accent text-surface font-semibold shadow-sm hover:shadow transition">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          {/* User Info */}
          <div className="hidden md:flex flex-col items-start">
            <span className="font-medium text-gray-800 text-sm">
              {user?.username}
            </span>
            <span className="font-medium text-text-muted text-sm">
              {user?.role }
            </span>
          </div>

          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="ml-2"
            title="User Menu"
          >
            <MoreVertical />
          </button>
          {/* Dropdown */}
          <div
            className={`absolute right-0 top-12 w-44 bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden z-10 transition-all duration-300 transform origin-top-right ${
              showUserMenu
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
            }`}
          >
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              onClick={() => setShowUserMenu(false)}
            >
              <User size={16} /> Profile
            </Link>
            <button
              onClick={() => {
                setShowUserMenu(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left transition"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
