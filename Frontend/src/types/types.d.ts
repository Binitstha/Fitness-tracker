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

export type FoodItem = {
  name: string;
  category: "breakfast" | "lunch" | "snack" | "dinner" | "beverage";
  protein: number; // grams
  calories: number; // kcal
  carbs: number; // grams
  fats: number; // grams
  servingSize: string; // e.g., "1 cup", "100g", "1 piece"
};

export type CombinedFoodItem = {
  name: string;
  category: string;
  totalProtein: number;
  totalCalories: number;
  totalCarbs: number;
  totalFats: number;
  servingSize?: string;
  foods?: string[];
};

export type mealDataType = {
  name: string;
  date: string;
  category: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
};

export type waterType = {
  date: string;
  amount: number;
};

export type waterGOalType = {
  target: number,
}