import { Menu, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import useDashboardLayout from "../../hooks/useDashboardLayout";

const AppHeader = ({ onMenuClick }) => {
    const {
    user,
    greeting,
    showUserMenu,
    setShowUserMenu,
    initials,
    handleLogout,
  } = useDashboardLayout() 
  
  return (
    <header className="sticky top-2 z-10 bg-app-surface backdrop-blur-md shadow-sm transition-all duration-500 rounded-full mx-2">

      {/* Header main */}
      <div className="flex justify-between items-center p-3 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-app-primary"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <Menu size={18} />
          </button>

          <div className="md:pl-3">
            <h1 className="text-sm md:text-lg font-bold mb-1">
              {greeting} {user?.username}
            </h1>
            <p className="text-sm text-app-text-muted font-medium">
              Welcome
            </p>
          </div>
        </div>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center bg-app-accent text-white font-bold shadow-md hover:shadow-lg transition"
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
            className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10 transition-all duration-300 transform origin-top ${
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
