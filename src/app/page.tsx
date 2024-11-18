import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

const Home = async () => {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  console.log({ session });

  return (
    <HydrateClient>
      <div className="flex h-dvh flex-col items-center justify-center bg-gray-900">
        <p className="text-2xl text-white">{hello ? hello.greeting : "Loading tRPC query..."}</p>

        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">{session && <span>Logged in as {session.user?.name}</span>}</p>

          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full font-semibold text-white no-underline"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>

        {session?.user && <LatestPost />}
      </div>
    </HydrateClient>
  );
};

export default Home;
