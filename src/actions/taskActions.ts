"use server";

import { TaskStatus } from "~/enums/taskStatus";
import { taskFormSchema } from "~/schema/taskSchemas";
import { api } from "~/trpc/server";
import type { NewTask } from "~/types/task";

export const submitTaskAction = async (originalTaskId: string | null, formData: FormData) => {
  console.log(formData);

  const taskData: NewTask = taskFormSchema.parse({
    assignedTo: formData.get("assignedTo"),
    deadline: new Date(formData.get("deadline") as string),
    description: formData.get("description"),
    points: Number(formData.get("points")),
    repeatCycle: formData.get("repeatCycle"),
    status: formData.get("status") ?? TaskStatus.PENDING,
  });

  if (originalTaskId) {
    await api.task.updateTask({
      id: originalTaskId,
      data: taskData,
    });

    return originalTaskId;
  } else {
    const newTask = await api.task.createTask(taskData);
    return newTask.id;
  }
};
