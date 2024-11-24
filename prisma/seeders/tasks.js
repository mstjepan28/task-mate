import { PrismaClient } from "@prisma/client";
import { createArray, createFakeTask, createFakeTaskForBothUsers } from "./helpers/task.js";
import { sharedSeedData } from "./sharedData.local.js";

/**
 * @typedef {import("../../src/types/task").Task} Task
 */

const prisma = new PrismaClient();

const user1Id = sharedSeedData.users[0]?.id;
const user2Id = sharedSeedData.users[1]?.id;

async function main() {
  if (!user1Id || !user2Id) {
    throw new Error("No users found in sharedSeedData");
  }

  /**
   * @type {Task[]}
   */
  const emptyTaskList = [];

  /**
   * Tasks from user1 assigned to user2
   */
  const tasks1 = createArray(5).reduce((acc) => {
    const newTask = createFakeTask(user1Id, user2Id);
    acc = [...acc, newTask];

    return acc;
  }, emptyTaskList);

  /**
   * Tasks from user2 assigned to user1
   */
  const tasks2 = createArray(5).reduce((acc) => {
    const newTask = createFakeTask(user2Id, user1Id);
    acc = [...acc, newTask];

    return acc;
  }, emptyTaskList);

  /**
   * Tasks from user1 assigned to both user1 and user2
   */
  const tasks3 = createArray(5).reduce((acc) => {
    const newTasks = createFakeTaskForBothUsers(user1Id, user2Id);
    acc = [...acc, ...newTasks];

    return acc;
  }, emptyTaskList);

  /**
   * Tasks from user2 assigned to both user1 and user2
   */
  const tasks4 = createArray(5).reduce((acc) => {
    const newTasks = createFakeTaskForBothUsers(user2Id, user1Id);
    acc = [...acc, ...newTasks];

    return acc;
  }, emptyTaskList);

  const fullTaskList = [...tasks1, ...tasks2, ...tasks3, ...tasks4];

  await prisma.task.createMany({
    data: fullTaskList,
  });

  console.log(`Successfully seeded tasks(${fullTaskList.length})`);
}

main()
  .catch((e) => {
    console.error("Error seeding tasks: ", e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
