import { useState } from "react";

function TaskForm({
  initialTask,
  onCreate,
  submitLabel = "Add Task",
  isSubmitDisabled = false,
}) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [dueDate, setDueDate] = useState(initialTask?.due_date || "");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    await onCreate?.({
      title,
      description,
      due_date: dueDate || null,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setError("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <p className="eyebrow">New task</p>
        <h2>Add Task</h2>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="Enter a title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          placeholder="Enter a description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button
          className="primary-button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
