import { Menu, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import useDashboardLayout from "../../hooks/useDashboardLayout";

const AppHeader = ({ onMenuClick }) => {
  const { user, showUserMenu, setShowUserMenu, initials, handleLogout } =
    useDashboardLayout();

  return (
    <header className="sticky z-10 bg-surface backdrop-blur-md shadow-b-sm transition-all duration-500">
      {/* Header main */}
      <div className="flex justify-between items-center p-6 md:px-8">
        {/* Left */}
        <div className="flex items-center">
          <button
            className="md:hidden text-primary"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <Menu size={18} />
          </button>
          {/* Logo */}
          <div>
            <Logo />
          </div>

          <div className="md:pl-3 pt-2">
            <h1 className="hidden md:block md:text-xl">
              Hello {user?.username}!
            </h1>
          </div>
        </div>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center bg-accent text-surface font-bold shadow-md hover:shadow-lg transition"
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

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-surface border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10 transition-all duration-300 transform origin-top ${
              showUserMenu
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
            }`}
          >
            <Link
              to="/dashboard/profile"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onBlur={() => setShowUserMenu(false)}
            >
              <User size={16} /> Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
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
