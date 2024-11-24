import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { TaskStatus } from "~/enums/taskStatus";
import { RepeatCycle } from "~/enums/repeatCycle";
import { deepCopy, objectValues } from "~/utils/objectHelpers";

const repeatCycleArray = objectValues(RepeatCycle);
const statusArray = objectValues(TaskStatus);
const today = dayjs().toDate();

/**
 * @param {string} assignedTo
 * @param {string} assignedBy
 * @returns {import("../../../src/types/task").Task}
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
 * @returns {import("../../../src/types/task").Task[]}
 */
export const createFakeTaskForBothUsers = (assignedTo, assignedBy) => {
  const task1 = createFakeTask(assignedTo, assignedBy);

  const task2 = deepCopy(task1);
  task2.assignedTo = assignedTo;

  return [task1, task2];
};
