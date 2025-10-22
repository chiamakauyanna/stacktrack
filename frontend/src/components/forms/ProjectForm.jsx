import { useState } from "react";
import api from "../../services/api";

export default function ProjectForm({ onSuccess }) {
  const [form, setForm] = useState({ title: "", description: "", status: "draft" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("projects/", form);
      alert("✅ Project created!");
      setForm({ title: "", description: "", status: "draft" });
      onSuccess && onSuccess(res.data.data);
    } catch (err) {
      console.error(err);
      alert("❌ Error creating project");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">Create Project</h3>
      <input
        name="title"
        placeholder="Title"
        className="border p-2 w-full mb-2"
        onChange={handleChange}
        value={form.title}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 w-full mb-2"
        onChange={handleChange}
        value={form.description}
      />
      <select
        name="status"
        className="border p-2 w-full mb-2"
        onChange={handleChange}
        value={form.status}
      >
        <option value="draft">Draft</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
    </form>
  );
}
