import { TaskForm } from "~/components/form/TaskForm";
import { CreateEditLayout } from "~/components/layout/CreateEditLayout";
import { getFriendListWithAuthUser } from "~/lib/serverHelpers";

export default async function CreateTaskPage() {
  const assignToList = await getFriendListWithAuthUser();

  return (
    <CreateEditLayout title={"New Task"}>
      <TaskForm assignToList={assignToList} />
    </CreateEditLayout>
  );
}
