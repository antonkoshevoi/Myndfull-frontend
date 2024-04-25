import { randomIntFromInterval } from "utils/randomIntFromInterval";

export const randomArrayElement = <T>(array: T[]): T => {
  const randomIndex = randomIntFromInterval(0, array.length - 1);
  return array[randomIndex];
};
