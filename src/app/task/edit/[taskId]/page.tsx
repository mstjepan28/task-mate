import { TaskForm } from "~/components/form/TaskForm";
import { MainLayout } from "~/components/layout/MainLayout";
import { ScreenHeader } from "~/components/layout/ScreenHeader";
import { api } from "~/trpc/server";

export default async function EditTaskPage({ params }: { params: { taskId: string } }) {
  const task = await api.task.getTaskById({ id: params.taskId });

  return (
    <MainLayout>
      <ScreenHeader title={"Edit Task"} />

      <div className="flex min-h-full flex-col px-2">
        {task ? <TaskForm task={task} /> : <div>404 - Task not found</div>}
      </div>
    </MainLayout>
  );
}
