import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Sidebar = ({ isMobile, onClose, activePath }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const links = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={22} />,
      label: "Dashboard",
    },
    { to: "/projects", icon: <FolderKanban size={22} />, label: "Projects" },
    {
      to: "/projects/analytics",
      icon: <BarChart3 size={22} />,
      label: "Analytics",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`bg-surface text-navy flex-col w-64 md:w-16 md:p-2 lg:p- lg:w-64 rounded-2xl ${
        isMobile
          ? "fixed z-50 p-6 inset-y-0 left-0 shadow-xl flex"
          : "hidden md:flex pl-6"
      }`}
    >
      {/* TOP SECTION */}
      <div className="flex flex-col flex-grow relative">
        {/* Close Button (Mobile Only) */}
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute top-1 right-1 text-navy hover:text-secondary transition"
          >
            <X size={22} />
          </button>
        )}

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-10 text-text-muted">
          {links.map(({ to, icon, label }) => {
            const isActive = activePath === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={`group relative flex items-center gap-3 p-4 rounded-l-2xl transition-all duration-300 overflow-hidden hover:bg-accent/25
                  ${isActive && "text-navy font-medium"}`}
              >
                {/* Accent bar */}
                <span
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-primary transition-opacity duration-300 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-40"
                  }`}
                ></span>

                <span className="relative flex items-center gap-3">
                  <span className={`${isActive && "text-primary"}`}>
                    {icon}
                  </span>
                  <span className="flex md:hidden lg:flex">{label}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-auto mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 hover:bg-navy px-4 hover:text-surface py-3 rounded-lg transition"
        >
          <LogOut size={20} />
          <span className="md:hidden block lg:block">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
