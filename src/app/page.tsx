import Link from "next/link";
import { redirect } from "next/navigation";
import { HiPlus } from "react-icons/hi";
import { MainLayout } from "~/components/layout/MainLayout";
import { TaskCard } from "~/components/tasks/TaskCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const userTasks = await api.task.getUserTasks();

  return (
    <HydrateClient>
      <MainLayout>
        <div className="flex h-full flex-col">
          <div className="flex gap-x-2 border-b px-2 py-4">
            <Input placeholder="Search tasks..." />

            <Link href="/task/create">
              <Button>
                <HiPlus />
              </Button>
            </Link>
          </div>

          <div className="basis-full overflow-y-auto">
            <div className="grid grid-cols-1 gap-2 px-2 py-4 xs:grid-cols-2 md:grid-cols-3">
              {userTasks.map((task) => {
                return <TaskCard key={task.id} task={task} />;
              })}
            </div>
          </div>
        </div>
      </MainLayout>
    </HydrateClient>
  );
}
