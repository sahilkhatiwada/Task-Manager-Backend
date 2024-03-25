import * as Yup from "yup";

const TaskValidationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required."),
  description: Yup.string().trim().required("Description is required."),
  dueDate: Yup.date().required("Due date is required."),
  priority: Yup.string()
    .oneOf(
      ["low", "medium", "high"],
      "Priority must be either low, medium, or high."
    )
    .default("low"),
  status: Yup.string()
    .oneOf(
      ["TO_DO", "IN-PROGRESS", "COMPLETED"],
      "Status must be either TO_DO, IN-PROGRESS, or COMPLETED."
    )
    .required("Status is required."),
  userId: Yup.string().required("User ID is required."),
});

export default TaskValidationSchema;
