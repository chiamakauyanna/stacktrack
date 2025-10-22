import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import StageForm from "../../components/forms/StageForm";

export default function StagesPage() {
  const { projectId } = useParams();
  const [stages, setStages] = useState([]);

  const fetchStages = async () => {
    const res = await api.get(`projects/${projectId}/stages/`);
    setStages(res.data.results || res.data);
  };

  useEffect(() => { fetchStages(); }, [projectId]);

  return (
    <div className="p-6">
      <Link to="/project" className="text-blue-600">← Back to Projects</Link>
      <h1 className="text-2xl font-bold mb-4">Project Stages</h1>
      <StageForm projectId={projectId} onSuccess={fetchStages} />
      <div className="grid grid-cols-2 gap-4">
        {stages.map((s) => (
          <Link
            key={s.id}
            to={`/projects/${projectId}/stages/${s.id}`}
            className="border p-4 rounded hover:bg-gray-100"
          >
            <h3>{s.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
