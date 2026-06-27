import {
  getAllTasks,
  createTask,
  findTaskById,
  updateTask,
  deleteTask,
  deleteAllTasks,
} from "../models/taskModel.js";

export const getTasksController = async (req, res) => {
  try {
    const { search = "", status = "all" } = req.query;
    const status_list = ["all", "active", "inactive"];

    if (!status_list.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status filter",
      });
    }

    const tasks = await getAllTasks({ search, status });

    if (tasks.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No tasks found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

export const createTaskController = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).trim({
        success: false,
        messsage: "Task title cannot be empty",
      });
    }

    const newTask = await createTask({
      title: title.trim(),
      description: description?.trim() || null,
      due_date: due_date || null,
    });

    res.status(201).json({
      success: true,
      message: "Task create successfully",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create new task",
      error: error.message,
    });
  }
};

export const getTaskByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await findTaskById(id);

    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch task",
      error: error.message,
    });
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, is_completed } = req.body;

    const existingTask = await findTaskById(id);

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title cannot be empty",
      });
    }

    const taskData = {
      title: title !== undefined ? title.trim() : existingTask.title,
      description:
        description !== undefined
          ? description.trim()
          : existingTask.description,
      due_date: due_date !== undefined ? due_date : existingTask.due_date,
      is_completed:
        is_completed !== undefined ? is_completed : existingTask.is_completed,
    };

    await updateTask(id, taskData);

    const updatedData = await findTaskById(id);

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to update task",
      error: error.message,
    });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTask = findTaskById(id);

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await deleteTask(id);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to delete task",
      error: error.message,
    });
  }
};

export const deleteAllTasksController = async (req, res) => {
  try {
    await deleteAllTasks();

    return res.status(200).json({
      success: true,
      message: "All tasks deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete all tasks",
      error: error.message,
    });
  }
};
