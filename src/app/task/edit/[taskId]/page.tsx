import { TaskForm } from "~/components/form/TaskForm";
import { MainLayout } from "~/components/layout/MainLayout";

const EditTaskPage = () => {
  return (
    <MainLayout>
      <TaskForm edit />
    </MainLayout>
  );
};

export default EditTaskPage;
