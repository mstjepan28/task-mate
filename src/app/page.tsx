import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { auth, signOut } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { MainLayout } from "../components/layout/MainLayout";

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
        <div className="flex size-full items-center">
          <div className="flex w-full flex-col items-center justify-center gap-y-2 rounded-lg bg-gray-900/25 py-6">
            <p className="text-center text-2xl text-white">
              <span>Logged in as {session.user?.name}</span>
            </p>

            <Button type="button" onClick={onSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </MainLayout>
    </HydrateClient>
  );
};

export default Home;
