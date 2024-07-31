import { CombinedFoodItem } from "@/types/types";

export const addMeal = async (data: CombinedFoodItem) => {
  try {
    const response = await fetch("http://localhost:5000/meal/addMeal", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
