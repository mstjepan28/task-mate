import { redirect } from "next/navigation";
import { UserTaskList } from "~/components/tasks/UserTaskList";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { MainLayout } from "../components/layout/MainLayout";

const Dashboard = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <HydrateClient>
      <MainLayout>
        <div className="px-2 py-4">
          <UserTaskList />
        </div>
      </MainLayout>
    </HydrateClient>
  );
};

export default Dashboard;
