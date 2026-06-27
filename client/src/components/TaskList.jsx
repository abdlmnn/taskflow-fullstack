import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  search,
  status,
  onDeleteTask,
  onEditTask,
  onNewTask,
  onMarkDone,
  onSearchChange,
  onStatusChange,
}) {
  const activeTasks = tasks.filter((task) => !task.is_completed);
  const completedTasks = tasks.filter((task) => task.is_completed);
  const showActiveTasks = status === "all" || status === "active";
  const showDoneTasks = status === "all" || status === "inactive";

  return (
    <div className="task-list-wrap">
      <div className="task-toolbar" aria-label="Task controls">
        <label className="search-field" htmlFor="task-search">
          <div className="search-input-wrap">
            <input
              id="task-search"
              type="search"
              placeholder="Search tasks"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </label>

        <div className="filter-group" aria-label="Filter tasks">
          <button
            type="button"
            className={`filter-button ${status === "all" ? "active" : ""}`}
            onClick={() => onStatusChange("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-button ${status === "active" ? "active" : ""}`}
            onClick={() => onStatusChange("active")}
          >
            Active
          </button>
          <button
            type="button"
            className={`filter-button ${status === "inactive" ? "active" : ""}`}
            onClick={() => onStatusChange("inactive")}
          >
            Inactive
          </button>
        </div>

        <div className="toolbar-actions">
          <div className="task-count">{tasks.length} tasks</div>
          <button className="primary-button" type="button" onClick={onNewTask}>
            + New Task
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="state-message">No tasks found.</p>
      ) : (
        <div className="task-board">
          {showActiveTasks && (
            <section className="task-column">
              <div className="column-header">
                <h3>Active Tasks</h3>
                <span>{activeTasks.length}</span>
              </div>

              {activeTasks.length === 0 ? (
                <p className="state-message">No incomplete tasks.</p>
              ) : (
                <ul className="task-list">
                  {activeTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onDelete={onDeleteTask}
                      onEdit={onEditTask}
                      onMarkDone={onMarkDone}
                    />
                  ))}
                </ul>
              )}
            </section>
          )}

          {showDoneTasks && (
            <section className="task-column">
              <div className="column-header">
                <h3>Done Tasks</h3>
                <span>{completedTasks.length}</span>
              </div>

              {completedTasks.length === 0 ? (
                <p className="state-message">No completed tasks.</p>
              ) : (
                <ul className="task-list">
                  {completedTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onDelete={onDeleteTask}
                      onEdit={onEditTask}
                    />
                  ))}
                </ul>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskList;
