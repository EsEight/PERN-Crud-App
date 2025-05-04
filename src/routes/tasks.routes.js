import { Router } from "express";
import { authValidate } from "../middlewares/validateToken.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/tasks.schema.js";

const router = Router();

router.get("/tasks", authValidate, getTasks);

router.get("/tasks/:id", authValidate, getTask);

router.post(
  "/tasks",
  authValidate,
  validateSchema(createTaskSchema),
  createTask
);

router.delete("/tasks/:id", authValidate, deleteTask);

router.put("/tasks/:id", authValidate, updateTask);

export default router;
