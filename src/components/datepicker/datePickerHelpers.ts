import dayjs, { type Dayjs } from "dayjs";
import { DayIndex } from "~/enums/dayIndex";

export const getWeekDays = () => {
  const monday = dayjs().day(DayIndex.MONDAY);
  return Array.from({ length: 7 }).map((_, index) => monday.add(index, "day").format("ddd"));
};

export const isDateOutOfRange = (date: Dayjs, options: { minDate?: Dayjs; maxDate?: Dayjs }) => {
  const beforeMin = options.minDate && date.isBefore(options.minDate);
  const afterMax = options.maxDate && date.isAfter(options.maxDate);

  return beforeMin ?? afterMax;
};

export const getDatesToDisplay = (curMonth: Dayjs) => {
  const paddingDaysStart = getStartPaddingDays(curMonth);
  const daysInMonth = getDatesForMonth(curMonth, curMonth.daysInMonth(), 0);

  const paddingDaysEnd = getEndPaddingDays(curMonth, paddingDaysStart.length + daysInMonth.length);
  return chunkArray([...paddingDaysStart, ...daysInMonth, ...paddingDaysEnd]);
};

/**
 * for a given year, returns the start and end of the decade that year is in
 * @example getDecadeForDate(dayjs("2021-01-01")) // { start: dayjs("2020-01-01"), end: dayjs("2029-12-31") }
 * @example getDecadeForDate(dayjs("1990-01-01")) // { start: dayjs("1990-01-01"), end: dayjs("1999-12-31") }
 */
export const getDecadeForDate = (date = dayjs()) => {
  const [m, c, d, y] = date.year().toString().split("");

  // --------- Check Start --------- //

  const millennium = Number(`${m}${c}`);
  const decade = Number(`${d}${y}`);

  const decadeStart = Math.floor(decade / 10) * 10;

  // --------- Check End --------- //

  const decadeEnd = decadeStart + 10;
  const endsInNextMillennium = decadeEnd === 100;

  const endMillennium = millennium + (endsInNextMillennium ? 1 : 0);
  const decadeEndStr = (endsInNextMillennium ? 0 : decadeEnd).toString().padEnd(2, "0");

  return {
    start: dayjs(`${millennium}${decadeStart}-01-01`).startOf("year"),
    end: dayjs(`${endMillennium}${decadeEndStr}-01-01`).subtract(1, "year").endOf("year"),
  };
};

const getDatesForMonth = (curMonth: Dayjs, numOfDaysInMonth: number, monthOffset: number) => {
  const month = (curMonth.month() % 12) + monthOffset;

  return Array.from({ length: numOfDaysInMonth }).map((_, index) => {
    return dayjs(curMonth)
      .set("month", month)
      .set("date", index + 1);
  });
};

const chunkArray = (arrayToChunk: Dayjs[]) => {
  const chunkSize = 7;
  const chunkedArray = [];

  for (let i = 0; i < arrayToChunk.length; i += chunkSize) {
    const chunk = arrayToChunk.slice(i, i + chunkSize);
    chunkedArray.push(chunk);
  }

  return chunkedArray;
};

const getStartPaddingDays = (curMonth: Dayjs) => {
  const startDayOfWeek = curMonth.date(1).day();

  // check if month start on a monday
  if (startDayOfWeek === 1) {
    return [];
  }

  const prevMonth = curMonth.subtract(1, "month").daysInMonth();
  const daysInPrevMonth = getDatesForMonth(curMonth, prevMonth, -1);

  const firstDateIndexToTake = daysInPrevMonth.length - ((startDayOfWeek + 6) % 7);
  return daysInPrevMonth.slice(firstDateIndexToTake);
};

const getEndPaddingDays = (curMonth: Dayjs, numOfDaysInMonth: number) => {
  const DAYS_IN_MONTH = 7 * 6; // show 6 rows
  const numOfDaysToFillIn = Math.ceil(numOfDaysInMonth / 7) * 7 - numOfDaysInMonth;

  const totalsDays = numOfDaysToFillIn + numOfDaysInMonth;

  if (totalsDays < DAYS_IN_MONTH) {
    return getDatesForMonth(curMonth, numOfDaysToFillIn + DAYS_IN_MONTH - totalsDays, 1);
  }

  return getDatesForMonth(curMonth, numOfDaysToFillIn, 1);
};
