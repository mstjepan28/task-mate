import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sharedSeedData } from "./sharedData.local.js";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);

  const userList = [
    {
      ...sharedSeedData.users[0],
      password: hashedPassword,
    },
    {
      ...sharedSeedData.users[1],
      password: hashedPassword,
    },
  ];

  await prisma.user.createMany({
    data: userList,
  });

  console.log(`Successfully seeded users(${userList.length})`);
}

main()
  .catch((e) => {
    console.error("Error seeding users: ", e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
