import { TaskForm } from "~/components/form/TaskForm";
import { CreateEditLayout } from "~/components/layout/CreateEditLayout";
import { api } from "~/trpc/server";

export default async function EditTaskPage({ params }: { params: { taskId: string } }) {
  const task = await api.task.getTaskById({ id: params.taskId });

  return (
    <CreateEditLayout title={"Edit Task"}>
      {task ? <TaskForm task={task} /> : <div>404 - Task not found</div>}
    </CreateEditLayout>
  );
}
