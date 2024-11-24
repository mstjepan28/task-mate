export const objectValues = <T>(obj: Record<string, T>): T[] => Object.values(obj);
export const objectKeys = <T>(obj: Record<string, T>): string[] => Object.keys(obj);
export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T;
