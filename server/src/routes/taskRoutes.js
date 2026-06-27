import express from "express";
import {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
  deleteAllTasksController,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasksController);
router.post("/", createTaskController);
router.get("/:id", getTaskByIdController);
router.patch("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);
router.delete("/", deleteAllTasksController);

export default router;
