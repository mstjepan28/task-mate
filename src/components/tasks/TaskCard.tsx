import type { Task } from "@prisma/client";
import dayjs from "dayjs";
import { TaskStatus } from "~/enums/taskStatus";

export const TaskCard = ({ task }: { task: Task }) => {
  const card = {
    [TaskStatus.PENDING]: "bg-yellow-400/90 border-yellow-700",
    [TaskStatus.STARTED]: "bg-blue-600/75 border-blue-700",
    [TaskStatus.CANCELED]: "bg-orange-500/75 border-orange-600",
    [TaskStatus.DONE]: "bg-green-600/75 border-green-700",
    [TaskStatus.FAILED]: "bg-red-600/75 border-red-700",
  }[task.status];

  const text = {
    [TaskStatus.PENDING]: "text-yellow-800",
    [TaskStatus.STARTED]: "text-blue-800",
    [TaskStatus.CANCELED]: "text-orange-800",
    [TaskStatus.DONE]: "text-green-800",
    [TaskStatus.FAILED]: "text-red-800",
  }[task.status];

  return (
    <div key={task.id} className={`w-full rounded-lg border-2 px-2 py-2 shadow-sm sm:min-w-0 ${card}`}>
      <div className="flex justify-between text-sm">
        <div className={`font-semibold ${text}`}>{task.status}</div>
        <div className="italic">{dayjs(task.deadline).format("DD-MM-YY")}</div>
      </div>

      <div className="font-semibold">{task.description}</div>
    </div>
  );
};
