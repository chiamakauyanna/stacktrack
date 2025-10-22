import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import TaskForm from "../../components/forms/TaskForm";

export default function TasksPage() {
  const { projectId, stageId } = useParams();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get(`stages/${stageId}/tasks/`);
    setTasks(res.data.results || res.data);
  };

  useEffect(() => { fetchTasks(); }, [stageId]);

  return (
    <div className="p-6">
      <Link to={`/projects/${projectId}`} className="text-blue-600">← Back to Stages</Link>
      <h1 className="text-2xl font-bold mb-4">Stage Tasks</h1>
      <TaskForm stageId={stageId} onSuccess={fetchTasks} />
      <div className="space-y-2">
        {tasks.map((t) => (
          <div key={t.id} className="border p-4 rounded">
            <h3 className="font-semibold">{t.title}</h3>
            <p className="text-sm">{t.description}</p>
            <p className="text-xs text-gray-600">
              {t.status} | {t.priority}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
