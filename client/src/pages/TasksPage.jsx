import { useState, useEffect } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../services/taskApi";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks(search, status);
        setTasks(data);
        setError("");
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, [search, status]);

  const refreshTasks = async () => {
    const data = await getTasks(search, status);
    setTasks(data);
  };

  const handleCreateTask = async (data) => {
    try {
      await createTask(data);
      await refreshTasks();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleMarkDone = async (task) => {
    try {
      await updateTask(task.id, { is_completed: true });
      await refreshTasks();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateTask = async (data) => {
    try {
      await updateTask(editingTask.id, data);
      await refreshTasks();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      await deleteTask(task.id);
      await refreshTasks();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">T</span>
          <h1>Task Flow</h1>
        </div>

        <nav aria-label="Primary navigation">
          <a href="#tasks" aria-current="page">
            <svg
              className="nav-task-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 6h11" />
              <path d="M8 12h11" />
              <path d="M8 18h11" />
              <path d="m3 6 1 1 2-2" />
              <path d="m3 12 1 1 2-2" />
              <path d="m3 18 1 1 2-2" />
            </svg>
            Tasks
          </a>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div className="topbar-title">
            <span>Task</span>
          </div>

          <div className="topbar-user" aria-label="Signed in user">
            <span>abdulmanan</span>
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23238636'/%3E%3Ccircle cx='40' cy='30' r='16' fill='%23f0f6fc'/%3E%3Cpath d='M14 76c3-18 17-30 26-30s23 12 26 30' fill='%23f0f6fc'/%3E%3C/svg%3E"
              alt="abdulmanan avatar"
            />
          </div>
        </header>

        <section className="workspace" id="tasks">
          <section className="task-panel" aria-label="Tasks">
            {isLoading && <p className="state-message">Loading tasks...</p>}

            {error && <p className="state-message error-message">{error}</p>}

            {!isLoading && !error && (
              <TaskList
                tasks={tasks}
                search={search}
                status={status}
                onEditTask={(task) => {
                  setEditingTask(task);
                  setIsTaskModalOpen(true);
                }}
                onDeleteTask={handleDeleteTask}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onNewTask={() => {
                  setEditingTask(null);
                  setIsTaskModalOpen(true);
                }}
                onMarkDone={handleMarkDone}
              />
            )}
          </section>
        </section>
      </main>

      {isTaskModalOpen && (
        <div className="modal-backdrop" role="presentation">
          <section
            className="task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-task-title"
          >
            <div className="modal-header">
              <h2 id="add-task-title">
                {editingTask ? "Edit Task" : "New Task"}
              </h2>
              <button
                className="modal-close"
                type="button"
                aria-label="Close add task modal"
                onClick={() => {
                  setIsTaskModalOpen(false);
                  setEditingTask(null);
                }}
              >
                x
              </button>
            </div>
            <TaskForm
              key={editingTask ? editingTask.id : "new-task"}
              initialTask={editingTask}
              submitLabel={editingTask ? "Update Task" : "Add Task"}
              onCreate={async (data) => {
                if (editingTask) {
                  await handleUpdateTask(data);
                } else {
                  await handleCreateTask(data);
                }
                setIsTaskModalOpen(false);
                setEditingTask(null);
              }}
            />
          </section>
        </div>
      )}
    </div>
  );
}

export default TasksPage;
