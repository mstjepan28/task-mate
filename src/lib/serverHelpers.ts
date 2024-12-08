import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import type { TBasicDataUser } from "~/types/user";

export const getFriendListWithAuthUser = async () => {
  const friendList = await api.user.getAuthUserFriends();
  const authUser = (await auth())?.user;

  if (!authUser) {
    redirect("/login");
  }

  friendList.unshift(authUser as TBasicDataUser);

  return friendList;
};
