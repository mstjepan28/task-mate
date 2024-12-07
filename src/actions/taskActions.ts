"use server";

import type { NewTask } from "~/types/task";

export const submitTaskAction = async (task: NewTask) => {
  console.log("Task submitted", task);
  return { success: true };
};
