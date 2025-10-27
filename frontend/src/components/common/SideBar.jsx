import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, X } from "lucide-react";
import Logo from "./Logo";
import { useAuthStore } from "../../store/useAuthStore";
import { MdAnalytics } from "react-icons/md";

const Sidebar = ({ isMobile, onClose, activePath }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const links = [
    { to: "/dashboard", icon: <Home size={18} />, label: "Home" },
    { to: "/projects", icon: <MdAnalytics size={18} />, label: "Projects" },
    {
      to: "/projects/analytics",
      icon: <MdAnalytics size={18} />,
      label: "Analytics",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`${
        isMobile
          ? "fixed z-50 w-64 p-6 inset-y-0 left-0 shadow-xl flex flex-col bg-app-primary text-white"
          : "hidden md:flex w-64 pl-6 flex-col bg-app-primary text-white"
      }`}
    >
      {/* === TOP SECTION === */}
      <div className="flex flex-col flex-grow relative">
        {/* Close Button (Mobile Only) */}
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition"
          >
            <X size={22} />
          </button>
        )}

        {/* Logo */}
        <div className="mt-8 mb-8">
          <Logo />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {links.map(({ to, icon, label }) => {
            const isActive = activePath === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden
                  ${
                    isActive
                      ? "text-white font-medium"
                      : "text-white/80 hover:text-white"
                  }`}
              >
                {/* Glow background */}
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-xl bg-app-accent/20 blur-md"
                    aria-hidden="true"
                  ></span>
                )}

                {/* Accent bar */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-app-accent transition-opacity duration-300 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-40"
                  }`}
                ></span>

                <span className="relative flex items-center gap-3">
                  {icon}
                  <span>{label}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* === BOTTOM SECTION === */}
      <div className="mt-auto mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 hover:bg-app-surface/10 px-4 py-3 rounded-lg transition w-full"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
