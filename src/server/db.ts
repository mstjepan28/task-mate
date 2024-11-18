import { PrismaClient } from "@prisma/client";
import { env } from "~/env";

const createPrismaClient = () => {
  const isDevMode = env.NODE_ENV === "development";

  return new PrismaClient({
    log: isDevMode ? ["query", "error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
