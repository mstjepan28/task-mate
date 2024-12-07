import { TaskForm } from "~/components/form/TaskForm";
import { MainLayout } from "~/components/layout/MainLayout";
import { ScreenHeader } from "~/components/layout/ScreenHeader";

export default async function CreateTaskPage() {
  return (
    <MainLayout>
      <ScreenHeader title={"New Task"} />

      <div className="flex min-h-full flex-col">
        <TaskForm />
      </div>
    </MainLayout>
  );
}
