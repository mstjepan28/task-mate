import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type TLogin = z.infer<typeof loginSchema>;
