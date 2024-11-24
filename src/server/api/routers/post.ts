import { createTRPCRouter } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  // create: protectedProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
  //   return ctx.db.post.create({
  //     data: {
  //       name: input.name,
  //       createdBy: { connect: { id: ctx.session.user.id } },
  //     },
  //   });
  // }),
});
