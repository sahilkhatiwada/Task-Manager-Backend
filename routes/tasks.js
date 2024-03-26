import express from "express";
import { validateRequestBody } from "../middleware/validation.middleware.js";
import TaskValidationSchema from "../validation/task.validation.js";
import { Task } from "../models/taskModel.js";
import validateAccessToken from "../middleware/authorizeToken.js";

const router = express.Router();

// Define the route for registering tasks
router.post(
  "/register/tasks",
  // Validate the request body against the TaskValidationSchema
  validateRequestBody(TaskValidationSchema),
  // Validate the access token to authenticate the user
  validateAccessToken,
  async (req, res) => {
    try {
      // Extract the new task details from the request body
      const newTask = req.body;

      // Extract the user details from the request
      const user = req.userDetails;

      // Assign the user's id to the new task's userId field
      newTask.userId = user._id;

      // Create a new task in the database with the newTask data
      await Task.create(newTask);

      // Send a success response with a status of 201 (Created)
      return res.status(201).send({ message: "Task created successfully" });
    } catch (error) {
      // If an error occurs, send a 500 (Internal Server Error) status code and the error message
      return res.status(500).send({ message: error.message });
    }
  }
);

export default router;
