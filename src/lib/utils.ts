import { clsx, type ClassValue } from "clsx";
import type { Dayjs } from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomArrayElement = <T>(arr: T[]): T => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex] as T;
};

export const createArray = (length: number): undefined[] => {
  return Array.from({ length });
};

export const sortDateArray = (dates: Dayjs[]) => {
  return dates.sort((a, b) => a.valueOf() - b.valueOf());
};
