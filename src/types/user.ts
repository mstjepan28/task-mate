import type { User } from "@prisma/client";

export type TBasicDataUser = Omit<User, "password" | "emailVerified">;
