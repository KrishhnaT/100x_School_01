import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {  createTask,  getTasks,  getTaskById,  updateTask,  deleteTask,} from "../controllers/todo.controllers.js";

const taskRouter = express.Router();

taskRouter.post("/", protect, createTask);
taskRouter.get("/", protect, getTasks);
taskRouter.get("/:id", protect, getTaskById);
taskRouter.put("/:id", protect, updateTask);
taskRouter.delete("/:id", protect, deleteTask);

export default taskRouter;
