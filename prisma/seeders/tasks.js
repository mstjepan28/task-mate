import { faker } from "@faker-js/faker";
import { createArray, createFakeTask, createFakeTaskForBothUsers } from "./helpers/task.js";
import { FAKER_SEED, sharedSeedData } from "./sharedData.local.js";

faker.seed(FAKER_SEED);

const user1Id = sharedSeedData.users[0]?.id;
const user2Id = sharedSeedData.users[1]?.id;

async function main() {
  if (!user1Id || !user2Id) {
    throw new Error("No users found in sharedSeedData");
  }

  /**
   * @type {import("../../src/types/task").Task[]}
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
  console.log(fullTaskList);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
