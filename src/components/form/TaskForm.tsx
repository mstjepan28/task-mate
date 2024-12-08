"use client";

import dayjs from "dayjs";
import { useActionState } from "react";
import { submitTaskAction } from "~/actions/taskActions";
import { RepeatCycle } from "~/enums/repeatCycle";
import type { Task } from "~/types/task";
import type { TBasicDataUser } from "~/types/user";
import { DatePicker } from "../datepicker/pickers/DatePicker";
import { SelectUser } from "../dropdowns/SelectUser";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const field = {
  description: "description",
  points: "points",
  repeatCycle: "repeatCycle",
  status: "status",
  deadline: "deadline",
  assignedTo: "assignedTo",
} as const;

export const TaskForm = ({ task, assignToList }: { task?: Task; assignToList: TBasicDataUser[] }) => {
  const [_, action] = useActionState(submitTaskAction, task?.id ?? null);

  return (
    <>
      <form action={action} className="flex basis-full flex-col gap-y-4 py-4">
        <div>
          <Label>Description</Label>
          <Textarea
            name={field.description}
            placeholder="Short overview of the task."
            defaultValue={task?.[field.description] ?? ""}
            className="resize-none"
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

        {/* <div>
          <Label>Repeat cycle</Label>
          <SelectRepeatCycle name={field.repeatCycle} />
        </div> */}

        <input name={field.repeatCycle} defaultValue={RepeatCycle.NEVER} className="sr-only" hidden />

        <div>
          <Label>Assign to</Label>
          <SelectUser name={field.assignedTo} defaultValue={task?.[field.assignedTo]} userList={assignToList} />
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
