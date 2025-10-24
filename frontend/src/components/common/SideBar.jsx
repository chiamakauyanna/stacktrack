import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, User, Settings, LogOut } from "lucide-react";
import { GoProject } from "react-icons/go";
import { IoCreate } from "react-icons/io5";
import Logo from "./Logo";
import { useAuthStore } from "../../store/useAuthStore";

const Sidebar = ({ isMobile, onClose, activePath }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const links = [
    { to: "/projects/create", icon: <IoCreate size={18} />, label: "Create Project" },
    { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Home" },
    { to: "/projects", icon: <GoProject size={18} />, label: "Projects" },
    { to: "/dashboard/settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  const handleLogout = () => {
    logout();           
    navigate("/login");
  };

  return (
    <aside
      className={`${
        isMobile
          ? "fixed z-50 w-64 p-6 inset-y-0 left-0 shadow-xl flex flex-col justify-between"
          : "hidden md:flex w-64 p-6 flex-col justify-between shadow-lg"
      } bg-gradient-to-b from-landing-primary to-landing-navy text-white`}
    >
      <div>
        <div className="mt-4">
          <Logo />
        </div>

        <nav className="flex flex-col gap-4 mt-10">
          {links.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                activePath === to ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 hover:bg-white/10 px-4 py-2 rounded-lg transition"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
