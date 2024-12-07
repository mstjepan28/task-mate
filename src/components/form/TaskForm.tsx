"use client";

import dayjs from "dayjs";
import { useActionState, useRef } from "react";
import { submitTaskAction } from "~/actions/taskActions";
import type { TOverlayRef } from "~/types/overlayElement";
import type { NewTask } from "~/types/task";
import { DatePicker } from "../datepicker/pickers/DatePicker";
import { BaseModal } from "../modal/BaseModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const field = {
  description: "description",
  points: "points",
  repeatCycle: "repeatCycle",
  status: "status",
  deadline: "deadline",
  assignedTo: "assignedTo",
} as const;

export const TaskForm = ({ task }: { task?: NewTask }) => {
  const [_, action] = useActionState(submitTaskAction, { success: false });
  const datePickerRef = useRef(null) as TOverlayRef;

  const openDatePicker = () => {
    datePickerRef.current?.open();
  };

  return (
    <>
      <form action={action} className="flex basis-full flex-col gap-y-4 py-4">
        <div>
          <Label>Description</Label>
          <Input
            name={field.description}
            placeholder="Short overview of the task."
            defaultValue={task?.[field.description] ?? ""}
          />
        </div>

        <div>
          <Label>Points</Label>
          <Input
            name={field.points}
            placeholder="How much points is this task worth?"
            defaultValue={task?.[field.points] ?? ""}
          />
        </div>

        <div>
          <Label>Deadline</Label>
          <DatePicker
            name={field.deadline}
            placeholder="Date until this task should be completed."
            initDate={task?.[field.deadline] ? dayjs(task?.[field.deadline]) : undefined}
          />
        </div>

        <div className="mt-auto">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
