import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { MainLayout } from "../components/layout/MainLayout";

const Home = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <HydrateClient>
      <MainLayout>
        <div className="flex size-full items-center">
          <div className="flex w-full flex-col items-center justify-center gap-y-2 rounded-lg bg-gray-900 py-6">
            <p className="text-center text-2xl text-white">
              <span>Logged in as {session.user?.name}</span>
            </p>

            <Link
              href="/api/auth/signout"
              className="rounded-xl border px-4 py-1 font-semibold text-white no-underline"
            >
              Sign out
            </Link>
          </div>
        </div>
      </MainLayout>
    </HydrateClient>
  );
};

export default Home;
