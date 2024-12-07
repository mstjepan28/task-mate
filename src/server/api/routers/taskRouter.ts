import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getUserTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.db.task.findMany({
      where: { assignedTo: ctx.session.user.id, deletedAt: null },
      take: 15,
    });

    return tasks;
  }),
  getTaskById: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const task = await ctx.db.task.findUnique({
        where: { id: input.id },
      });

      return task;
    }),
});
