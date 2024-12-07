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

export const TaskForm = ({ task }: { task: NewTask }) => {
  const [_, action] = useActionState(submitTaskAction, { task });
  const datePickerRef = useRef(null) as TOverlayRef;

  const openDatePicker = () => {
    datePickerRef.current?.open();
  };

  return (
    <>
      <BaseModal ref={datePickerRef}>date picker</BaseModal>

      <form action={action} className="flex basis-full flex-col gap-y-2 py-4">
        <div>
          <Label>Task name</Label>
          <Input name={field.description} defaultValue={task[field.description]} />
        </div>

        <div>
          <Label>Task name</Label>
          <Input name={field.points} defaultValue={task[field.points]} />
        </div>

        <button type="button" className="block text-start" onClick={openDatePicker}>
          <Label>Task name</Label>
          <Input name={field.deadline} defaultValue={dayjs(task[field.deadline]).format("DD/MM/YYYY")} readOnly />
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
