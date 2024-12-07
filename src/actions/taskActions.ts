"use server";

import type { NewTask } from "~/types/task";

export const submitTaskAction = async (prevState: NewTask | null, formData: FormData) => {
  console.log("Task submitted", prevState, formData);
  return null;
};
