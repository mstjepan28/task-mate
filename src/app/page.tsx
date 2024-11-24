import { redirect } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";
import { auth, signOut } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { MainLayout } from "../components/layout/MainLayout";
import { UserTaskList } from "~/components/tasks/UserTaskList";

const Home = async () => {
  const session = await auth();

  const onSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/login" });
  };

  if (!session) {
    redirect("/login");
  }

  return (
    <HydrateClient>
      <MainLayout>
        <div className="flex w-full justify-between border-b border-gray-900 pb-2">
          <span className="text-lg font-semibold">Hello {session.user?.name}!</span>

          <button type="button" onClick={onSignOut}>
            <HiOutlineLogout size={24} />
          </button>
        </div>

        <div className="py-4">
          <UserTaskList />
        </div>
      </MainLayout>
    </HydrateClient>
  );
};

export default Home;
