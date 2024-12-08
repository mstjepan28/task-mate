import { z } from "zod";
import { taskFormSchema } from "~/schema/taskSchemas";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  /*************************************************/
  /****************** GET ROUTES /******************/
  /*************************************************/
  getUserTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.db.task.findMany({
      where: { assignedTo: ctx.session.user.id, deletedAt: null },
      orderBy: { updatedAt: "desc" },
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

  /*************************************************/
  /***************** CREATE ROUTES *****************/
  /*************************************************/
  createTask: protectedProcedure.input(taskFormSchema).query(async ({ input, ctx }) => {
    if (!ctx.session.user.id) {
      throw new Error("User not authenticated");
    }

    const task = await ctx.db.task.create({
      data: {
        description: input.description,
        points: input.points,
        repeatCycle: input.repeatCycle,
        status: input.status,
        deadline: input.deadline,
        assignedTo: input.assignedTo,
        assignedBy: ctx.session.user.id,
      },
    });

    return task;
  }),
  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: taskFormSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updatedTask = await ctx.db.task.update({
        where: { id: input.id },
        data: input.data,
      });

      return updatedTask;
    }),

  /*************************************************/
  /***************** UPDATE ROUTES *****************/
  /*************************************************/
});
