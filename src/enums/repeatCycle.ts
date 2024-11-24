export const RepeatCycle = {
  NEVER: "NEVER",
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
  CUSTOM: "CUSTOM",
} as const;

export type TRepeatCycle = (typeof RepeatCycle)[keyof typeof RepeatCycle];
