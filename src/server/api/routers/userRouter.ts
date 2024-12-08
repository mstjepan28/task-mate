import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type { TFriend } from "~/types/user";

export const userRouter = createTRPCRouter({
  getAuthUserFriends: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const friends = await ctx.db.friendship.findMany({
      where: { userId },
    });

    const userList = await ctx.db.user.findMany({
      where: {
        id: {
          in: friends.map((friend) => friend.friendId),
        },
      },
    });

    return userList.map((user): TFriend => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      };
    });
  }),
});
