export const RangeStatus = {
  SELECTED: "selected",
  BETWEEN: "between",
  TODAY: "today",
  OUTSIDE: "outside",
} as const;

export type TRangeStatus = (typeof RangeStatus)[keyof typeof RangeStatus];
