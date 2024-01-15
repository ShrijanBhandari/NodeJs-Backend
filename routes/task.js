import express from "express";
import {
  getTask,
  addTask,
  updateTask,
  deleteTask,
  editTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post("/addtask", isAuthenticated, addTask);
router.get("/mytask", isAuthenticated, getTask);
router.put("/:id", isAuthenticated, editTask);
router.put("/check/:id", isAuthenticated, updateTask);
router.delete("/:id", isAuthenticated, deleteTask);
export default router;
