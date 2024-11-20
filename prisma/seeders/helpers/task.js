import { faker } from "@faker-js/faker";
import { RepeatCycle } from "@prisma/client";
import dayjs from "dayjs";
import { TaskStatus } from "~/enums/taskStatus";
import { objectValues } from "~/utils/objectHelpers";

const repeatCycleArray = objectValues(RepeatCycle);
const statusArray = objectValues(TaskStatus);
const today = dayjs().toDate();

/**
 * @typedef {Object} Assignment
 * @property {string} to
 * @property {string} by
 */

/**
 *
 * @param {Assignment} assigned
 * @returns
 */
export const createFakeTask = (assigned) => {
  return {
    id: faker.string.uuid(),
    points: faker.helpers.rangeToNumber({ min: 1, max: 30 }),
    description: faker.word.sample(),
    repeatCycle: faker.helpers.arrayElement(repeatCycleArray),
    status: faker.helpers.arrayElement(statusArray),
    deadline: dayjs().add(1, "month").toDate(),
    assignedTo: assigned.to,
    assignedBy: assigned.by,
    createdAt: today,
    updatedAt: today,
    deletedAt: null,
  };
};
