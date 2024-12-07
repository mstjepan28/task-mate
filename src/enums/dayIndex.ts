/**
 * Used to ensure consistent indexing of days in dayjs without
 * confusion about the starting day of the week.
 */
export const DayIndex = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0,
} as const;
