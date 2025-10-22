import { useState } from "react";
import api from "../../services/api";

export default function TaskForm({ stageId, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`stages/${stageId}/tasks/`, form);
      alert("✅ Task created!");
      setForm({ title: "", description: "", status: "todo", priority: "medium" });
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      alert("❌ Error creating task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">Add Task</h3>
      <input
        name="title"
        placeholder="Task Title"
        className="border p-2 w-full mb-2"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 w-full mb-2"
        value={form.description}
        onChange={handleChange}
      />
      <select name="status" className="border p-2 w-full mb-2" value={form.status} onChange={handleChange}>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <select name="priority" className="border p-2 w-full mb-2" value={form.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button className="bg-purple-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
