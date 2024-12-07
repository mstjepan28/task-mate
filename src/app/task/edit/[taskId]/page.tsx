import { TaskForm } from "~/components/form/TaskForm";
import { CreateEditLayout } from "~/components/layout/CreateEditLayout";
import { api } from "~/trpc/server";

export default async function EditTaskPage({ params }: { params: Promise<{ taskId: string }> }) {
  const taskId = (await params).taskId;
  const task = await api.task.getTaskById({ id: taskId });

  return (
    <CreateEditLayout title={"Edit Task"}>
      {task ? <TaskForm task={task} /> : <div>404 - Task not found</div>}
    </CreateEditLayout>
  );
}
