import dayjs from "dayjs";
import { api } from "~/trpc/server";

export const UserTaskList = async () => {
  const userTasks = await api.task.getUserTasks();

  return userTasks.map((task) => {
    return (
      <div key={task.id} className="mb-1 flex w-full border-b border-gray-900 pb-1">
        <div className="basis-full">
          <div>{task.description}</div>
        </div>

        <div className="basis-full text-end">
          <div>{dayjs(task.deadline).format("DD-MM-YYYY HH:mm")}</div>
          <div>{task.points}</div>
        </div>
      </div>
    );
  });
};
