import { useState, useEffect } from "react";
import ProjectForm from "../../components/forms/ProjectForm";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await api.get("projects/my-projects/");
    setProjects(res.data.data.projects);
  };

  useEffect(() => { fetchProjects(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>
      <ProjectForm onSuccess={fetchProjects} />
      <div className="grid grid-cols-3 gap-4">
        {projects.map((p) => (
          <Link to={`/projects/${p.id}`} key={p.id} className="border p-4 rounded hover:bg-gray-100">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
