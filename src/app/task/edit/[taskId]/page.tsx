import { TaskForm } from "~/components/form/TaskForm";
import { CreateEditLayout } from "~/components/layout/CreateEditLayout";
import { getFriendListWithAuthUser } from "~/lib/serverHelpers";
import { api } from "~/trpc/server";

export default async function EditTaskPage({ params }: { params: Promise<{ taskId: string }> }) {
  const taskId = (await params).taskId;
  const task = await api.task.getTaskById({ id: taskId });

  const assignToList = await getFriendListWithAuthUser();

  return (
    <CreateEditLayout title="Edit Task">
      {task ? <TaskForm task={task} assignToList={assignToList} /> : <div>404 - Task not found</div>}
    </CreateEditLayout>
  );
}
