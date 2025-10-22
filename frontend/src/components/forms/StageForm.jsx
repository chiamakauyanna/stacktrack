import { useState } from "react";
import api from "../../services/api";

export default function StageForm({ projectId, onSuccess }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`projects/${projectId}/stages/`, { title });
      alert("✅ Stage created!");
      setTitle("");
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      alert("❌ Error creating stage");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">Add Stage</h3>
      <input
        placeholder="Stage Title"
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
