import { RepeatCycle } from "@prisma/client";
import { z } from "zod";
import { TaskStatus } from "~/enums/taskStatus";

export const taskFormSchema = z.object({
  description: z.string().max(255),
  points: z.number().int().positive().max(100).min(1),
  repeatCycle: z.nativeEnum(RepeatCycle),
  status: z.nativeEnum(TaskStatus),
  deadline: z.coerce.date(),
  assignedTo: z.string().uuid(),
});
