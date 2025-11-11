import Modal from "../common/Modal";

const EditModal = ({
  isOpen,
  onClose,
  editingType,
  data,
  setData,
  handleSave,
  selectedTask,
  selectedStage,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={
      editingType === "task"
        ? selectedTask
          ? "Edit Task"
          : "Add Task"
        : editingType === "stage"
        ? selectedStage
          ? "Edit Stage"
          : "Add Stage"
        : "Edit Project"
    }
  >
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="space-y-4"
    >
      {/* Title (for all types) */}
      <div>
        <label className="text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-30"
          required
        />
      </div>

      {/* Description for tasks and projects only */}
      {(editingType === "task" || editingType === "project") && (
        <div>
          <label className="text-sm font-medium text-gray-600">Description</label>
          <textarea
            value={data.description || ""}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-30"
            required={editingType === "project"}
          />
        </div>
      )}

      {/* Task-specific fields */}
      {editingType === "task" && (
        <div className="flex flex-col space-y-4">
          {/* Priority */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-600">Priority</label>
            <select
              value={data.priority || "medium"}
              onChange={(e) => setData({ ...data, priority: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-30"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-600">Due Date</label>
            <input
              type="date"
              value={data.due_date || ""}
              onChange={(e) => setData({ ...data, due_date: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-30"
            />
          </div>
        </div>
      )}

      {/* Save button */}
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg shadow hover:scale-105 transition-transform"
      >
        Save
      </button>
    </form>
  </Modal>
);

export default EditModal;
