import Modal from "../../components/common/Modal";

const EditModal = ({ isOpen, onClose, editingType, data, setData, handleSave, selectedTask, selectedStage }) => (
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
      <div>
        <label className="text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">Description</label>
        <textarea
          value={data.description || ""}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {editingType === "task" && (
        <div>
          <label className="text-sm font-medium text-gray-600">Due Date</label>
          <input
            type="date"
            value={data.due_date || ""}
            onChange={(e) => setData({ ...data, due_date: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg shadow hover:scale-105 transition-transform"
      >
        Save
      </button>
    </form>
  </Modal>
);

export default EditModal;
