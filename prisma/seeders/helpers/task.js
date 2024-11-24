import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { FAKER_SEED } from "../sharedData.local.js";

/**
 * @typedef {import("../../../src/enums/repeatCycle").TRepeatCycle} Cycle
 * @typedef {import("../../../src/enums/taskStatus").TTaskStatus} Status
 * @typedef {import("../../../src/types/task").Task} Task
 */

faker.seed(FAKER_SEED);

/**
 *
 * @type {Cycle[]}
 */
const repeatCycleArray = ["never", "daily", "weekly", "monthly", "yearly", "custom"];
/**
 *
 * @type {Status[]}
 */
const statusArray = ["pending", "started", "canceled", "done"];
const today = dayjs().toDate();

/**
 * @param {string} assignedTo
 * @param {string} assignedBy
 * @returns {Task}
 */
export const createFakeTask = (assignedTo, assignedBy) => {
  return {
    id: faker.string.uuid(),
    points: faker.helpers.rangeToNumber({ min: 1, max: 30 }),
    description: faker.word.sample(),
    repeatCycle: faker.helpers.arrayElement(repeatCycleArray),
    status: faker.helpers.arrayElement(statusArray),
    deadline: dayjs().add(1, "month").toDate(),
    assignedTo: assignedTo,
    assignedBy: assignedBy,
    createdAt: today,
    updatedAt: today,
    deletedAt: null,
  };
};

/**
 * @param {string} assignedTo
 * @param {string} assignedBy
 * @returns {Task[]}
 */
export const createFakeTaskForBothUsers = (assignedTo, assignedBy) => {
  const task1 = createFakeTask(assignedTo, assignedBy);

  const task2 = copyTask(task1);
  task2.assignedTo = assignedTo;

  return [task1, task2];
};

/**
 * @param {number} length
 * @returns {undefined[]}
 */
export const createArray = (length) => {
  return Array.from({ length });
};

/**
 *
 * @param {Task} obj
 * @returns {Task}
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const copyTask = (obj) => JSON.parse(JSON.stringify(obj));
