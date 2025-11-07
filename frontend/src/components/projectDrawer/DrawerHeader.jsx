import { X, Pencil, Trash2, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const DrawerHeader = ({
  selectedProject,
  setSelectedProject,
  handleDeleteProject,
}) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // close menu when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex items-center justify-between p-4 bg-primary">
      <p className="text-base md:text-lg font-semibold text-surface pr-2 font-heading">
        {selectedProject.title}
      </p>

      <div className="flex items-center gap-1 relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 rounded hover:bg-secondary transition"
        >
          <MoreVertical size={20} className="text-surface" />
        </button>

        {showMenu && (
          <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-42 z-50">
            <button
              onClick={() => navigate(`/projects/${selectedProject.id}`)}
              className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-sm text-gray-700"
            >
              <Pencil size={16} className="text-blue-500" /> Edit Project
            </button>
            <button
              onClick={() => handleDeleteProject(selectedProject.id)}
              className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-sm text-red-600"
            >
              <Trash2 size={16} /> Delete Project
            </button>
          </div>
        )}

        <button
          onClick={() => setSelectedProject(null)}
          className="p-2 rounded hover:bg-secondary transition"
          title="Close Drawer"
        >
          <X size={20} className="text-surface" />
        </button>
      </div>
    </div>
  );
};

export default DrawerHeader;
