import { auth } from "~/server/auth";
import { BottomNav } from "./BottomNav";

interface IProps {
  children: React.ReactNode;
}

export const MainLayout = async ({ children }: IProps) => {
  const session = await auth();

  return (
    <div className="flex min-h-dvh w-full flex-col text-gray-900">
      <div className="basis-full p-2">{children}</div>
      {session && <BottomNav />}
    </div>
  );
};
