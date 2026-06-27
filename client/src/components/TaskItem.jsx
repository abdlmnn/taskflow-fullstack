import { useState } from "react";

function TaskItem({ task, onDelete, onEdit, onMarkDone }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <li className={`task-item ${task.is_completed ? "is-complete" : ""}`}>
      <div className="task-item-main">
        <div className="task-title-row">
          <div>
            <p className="priority-tag">
              {task.is_completed ? "Completed" : "Active"}
            </p>
            <h3>{task.title}</h3>
          </div>

          <div className="task-actions-menu-wrap">
            <button
              className="icon-button"
              type="button"
              aria-label="Task actions"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="5" cy="12" r="1.6" />
                <circle cx="12" cy="12" r="1.6" />
                <circle cx="19" cy="12" r="1.6" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="task-actions-menu" role="menu">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onEdit?.(task);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="danger-action"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onDelete?.(task);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {task.description && <p className="task-description">{task.description}</p>}

        <div className="task-meta-row">
          {task.due_date && <span className="due-date">Due: {task.due_date}</span>}
          {!task.is_completed && (
            <button
              className="done-button"
              type="button"
              onClick={() => onMarkDone?.(task)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12 4 4L19 6" />
              </svg>
              Mark done
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
