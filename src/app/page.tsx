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
        <p className="text-center text-2xl text-white">{session && <span>Logged in as {session.user?.name}</span>}</p>

        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full font-semibold text-white no-underline"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </MainLayout>
    </HydrateClient>
  );
};

export default Home;
