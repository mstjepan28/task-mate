import { TaskForm } from "~/components/form/TaskForm";
import { MainLayout } from "~/components/layout/MainLayout";
import { ScreenHeader } from "~/components/layout/ScreenHeader";

export default async function CreateTaskPage() {
  return (
    <MainLayout>
      <div className="flex h-full flex-col">
        <ScreenHeader title={"Edit Task"} />

        <div className="flex basis-full flex-col px-2">
          <TaskForm />
        </div>
      </div>
    </MainLayout>
  );
}
