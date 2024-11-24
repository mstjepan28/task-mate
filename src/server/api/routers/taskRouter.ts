import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getUserTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.db.task.findMany({
      where: { assignedTo: ctx.session.user.id, deletedAt: null },
      take: 15,
    });

    return tasks;
  }),
});
