import { formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Workout = {
  type: string;
  baseCaloriesPerHour: number;
};

export const workouts: Workout[] = [
  { type: "Running", baseCaloriesPerHour: 700 },
  { type: "Walking", baseCaloriesPerHour: 275 },
  { type: "Cycling", baseCaloriesPerHour: 550 },
  { type: "Jumping Rope", baseCaloriesPerHour: 800 },
  { type: "Swimming", baseCaloriesPerHour: 500 },
  { type: "HIIT", baseCaloriesPerHour: 750 },
  { type: "Rowing", baseCaloriesPerHour: 500 },
  { type: "Stair Climbing", baseCaloriesPerHour: 600 },
  { type: "Elliptical Trainer", baseCaloriesPerHour: 600 },
  { type: "Strength Training", baseCaloriesPerHour: 400 },
];

const date = new Date();
export const formattedDate = date.toISOString().split("T")[0];


export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (isYesterday(date)) {
    return 'yesterday';
  } else {
    return formatDistanceToNow(date, { addSuffix: true });
  }
};
