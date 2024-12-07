import type { Task } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { TaskStatus } from "~/enums/taskStatus";
import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015

dayjs.extend(advancedFormat);

export const TaskCard = ({ task }: { task: Task }) => {
  const statusStyle = {
    [TaskStatus.STARTED]: "bg-blue-100 text-blue-800",
    [TaskStatus.PENDING]: "bg-yellow-100 text-yellow-800",
    [TaskStatus.FAILED]: "bg-red-100 text-red-800",
    [TaskStatus.DONE]: "bg-green-100 text-green-800",
    [TaskStatus.CANCELED]: "bg-gray-100 text-gray-800",
  }[task.status];

  return (
    <Link
      href={`/task/edit/${task.id}`}
      className="w-full rounded-lg border border-primary bg-white p-2 text-primary sm:min-w-0"
    >
      <div className="flex justify-between pb-2 text-xs">
        <div className={twMerge("rounded-lg px-2", statusStyle)}>{task.status}</div>
        <div>{dayjs(task.deadline).format("MMMM Do, YYYY")}</div>
      </div>

      <div className="font-medium">{task.description}</div>
    </Link>
  );
};
