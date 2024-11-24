import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

/**
 * @typedef {import("../../../src/enums/repeatCycle").TRepeatCycle} Cycle
 * @typedef {import("../../../src/enums/taskStatus").TTaskStatus} Status
 * @typedef {import("../../../src/types/task").Task} Task
 */

/**
 *
 * @type {Cycle[]}
 */
const repeatCycleArray = ["NEVER", "DAILY", "WEEKLY", "MONTHLY", "YEARLY", "CUSTOM"];
/**
 *
 * @type {Status[]}
 */
const statusArray = ["PENDING", "STARTED", "CANCELED", "DONE", "FAILED"];

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
    deadline: new Date(dayjs().add(1, "month").toDate()),
    assignedTo: assignedTo,
    assignedBy: assignedBy,
    createdAt: new Date(),
    updatedAt: new Date(),
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

  task2.id = faker.string.uuid();
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
