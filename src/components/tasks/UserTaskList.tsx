import { api } from "~/trpc/server";
import { TaskCard } from "./TaskCard";

export const UserTaskList = async () => {
  const userTasks = await api.task.getUserTasks();

  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-2 md:grid-cols-3">
      {userTasks.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
    </div>
  );
};
