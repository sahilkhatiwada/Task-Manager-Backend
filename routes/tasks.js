import express from "express";
import { validateRequestBody } from "../middleware/validation.middleware.js";
import TaskValidationSchema from "../validation/task.validation.js";
import { Task } from "../models/taskModel.js";
import { validateAccessToken } from "../middleware/authorizeToken.js";

const router = express.Router();

router.post(
  "/register/tasks",
  validateRequestBody(TaskValidationSchema),
  validateAccessToken,
  async (req, res) => {
    const newTask = req.body;
    const user = req.userDetails;

    newTask.userId = user._id;

    // create new task
    await Task.create(newTask);
    return res.status(201).json({ message: "Task created successfully" });
  }
);

export default router;
