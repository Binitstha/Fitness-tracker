export type workoutType = {
  calories: number;
  date: string;
  duration: number;
  effort: string;
  id: string;
  speed: number;
  type: string;
  userId: string;
};

export type goalType = {
  id: string;
  description: string;
  targetDate: string;
  achieved: boolean;
  targetCalories: number;
  currentCalories?: number;
  achievements?: { id: string; title: string }[];
};
