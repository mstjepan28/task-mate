import { TaskForm } from "~/components/form/TaskForm";
import { CreateEditLayout } from "~/components/layout/CreateEditLayout";
import { api } from "~/trpc/server";

export default async function CreateTaskPage() {
  const friendList = await api.user.getAuthUserFriends();

  return (
    <CreateEditLayout title={"New Task"}>
      <TaskForm friendList={friendList} />
    </CreateEditLayout>
  );
}
