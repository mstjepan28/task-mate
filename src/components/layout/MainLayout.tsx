import { auth } from "~/server/auth";
import { BottomNav } from "./BottomNav";

export const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <div className="flex h-dvh max-h-dvh min-h-dvh w-full flex-col text-gray-900">
      <div className="basis-full overflow-y-auto">{children}</div>
      {session && <BottomNav />}
    </div>
  );
};
