import { auth } from "~/server/auth";
import dayjs from "dayjs";
import { create } from "domain";
import { z } from "zod";
import { RepeatCycle } from "~/enums/repeatCycle";
import { TaskStatus } from "~/enums/taskStatus";
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
  createTask: protectedProcedure
    .input(
      z.object({
        description: z.string().max(255),
        points: z.number().int().positive().max(100).min(1),
        repeatCycle: z.nativeEnum(RepeatCycle),
        status: z.nativeEnum(TaskStatus),
        deadline: z.coerce.date().transform((d) => dayjs(d).toISOString()),
        assignedTo: z.string().uuid(),
      }),
    )
    .query(async ({ input, ctx }) => {
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
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
          deletedAt: null,
        },
      });

      return task;
    }),

  /*************************************************/
  /***************** UPDATE ROUTES *****************/
  /*************************************************/
});
