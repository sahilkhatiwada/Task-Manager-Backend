import * as Yup from "yup";

export const taskValidation = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required"),
});
