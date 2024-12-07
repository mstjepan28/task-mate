import { TaskForm } from "~/components/form/TaskForm";
import { CreateEditLayout } from "~/components/layout/CreateEditLayout";

export default async function CreateTaskPage() {
  return (
    <CreateEditLayout title={"New Task"}>
      <TaskForm />
    </CreateEditLayout>
  );
}
