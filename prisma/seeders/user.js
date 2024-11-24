import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sharedSeedData } from "./sharedData.local";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);

  await prisma.user.createMany({
    data: [
      {
        ...sharedSeedData.users[0],
        password: hashedPassword,
      },
      {
        ...sharedSeedData.users[1],
        password: hashedPassword,
      },
    ],
  });

  console.log("Users seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
