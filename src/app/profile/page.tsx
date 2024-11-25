import { redirect } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";
import { MainLayout } from "~/components/layout/MainLayout";
import { auth, signOut } from "~/server/auth";

const ProfileScreen = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const onSignOut = async () => {
    await signOut({ redirectTo: "/login" });
  };

  return (
    <MainLayout>
      <div className="flex w-full justify-between border-b border-gray-900 pb-2">
        <span className="text-lg font-semibold">Hello {session?.user?.name}!</span>

        <button type="button" onClick={onSignOut}>
          <HiOutlineLogout size={24} />
        </button>
      </div>
    </MainLayout>
  );
};

export default ProfileScreen;
