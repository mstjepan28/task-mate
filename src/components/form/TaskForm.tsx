"use client";

import dayjs from "dayjs";
import { useActionState, useRef } from "react";
import { submitTaskAction } from "~/actions/taskActions";
import type { TOverlayRef } from "~/types/OverlayElement";
import type { NewTask } from "~/types/task";
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
      <BaseModal ref={datePickerRef}>date picker</BaseModal>

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

        <button type="button" className="block text-start" onClick={openDatePicker}>
          <Label>Deadline</Label>
          <Input
            name={field.deadline}
            placeholder="Date until this task should be completed."
            defaultValue={task?.[field.deadline] ? dayjs(task?.[field.deadline]).format("DD/MM/YYYY") : ""}
            className="pointer-events-none"
            readOnly
          />
        </button>

        <div className="mt-auto">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
