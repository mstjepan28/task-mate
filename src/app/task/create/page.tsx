import { TaskForm } from "~/components/form/TaskForm";
import { MainLayout } from "~/components/layout/MainLayout";

const CreateTaskPage = () => {
  return (
    <MainLayout>
      <TaskForm />
    </MainLayout>
  );
};

export default CreateTaskPage;
