"use client";

import { useActionState } from "react";
import { submitTaskAction } from "~/actions/taskActions";
import type { NewTask } from "~/types/task";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const field = {
  description: "description",
  points: "points",
  repeatCycle: "repeatCycle",
  status: "status",
  deadline: "deadline",
  assignedTo: "assignedTo",
} as const;

export const TaskForm = ({ task }: { task: NewTask }) => {
  const [_, action] = useActionState(submitTaskAction, { task });

  return (
    <form action={action} className="flex flex-col gap-y-2 bg-red-600">
      <div>
        <Label>Task name</Label>
        <Input name={field.description} defaultValue={task[field.description]}></Input>
      </div>

      <div>
        <Label>Task name</Label>
        <Input defaultValue={task.description}></Input>
      </div>

      <Button type="submit" className="rounded-lg bg-blue-600 py-2 font-semibold text-white shadow-md">
        Submit
      </Button>
    </form>
  );
};
