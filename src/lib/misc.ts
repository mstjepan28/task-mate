export const getRandomArrayElement = <T>(arr: T[]): T => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex] as T;
};

export const createArray = (length: number): undefined[] => {
  return Array.from({ length });
};
