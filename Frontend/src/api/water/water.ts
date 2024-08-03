import { toast } from "@/components/ui/use-toast";
import { waterGoalType, waterType } from "@/types/types";

export const addWater = async (data: waterType) => {
  try {
    const response = await fetch("http://localhost:5000/water/addWater", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      console.log(result.data);
      toast({
        title: "Water Intake Added",
        description: "Water intake is successfully added",
      });
      return result.data;
    } else {
      toast({
        title: "Failed Operation",
        description: "Failed to add water intake",
      });
      console.log(result.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getWater = async () => {
  try {
    const response = await fetch("http://localhost:5000/water/", {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      return result.data;
    } else {
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const setWaterGoal = async (data: waterGoalType) => {
  try {
    const response = await fetch("http://localhost:5000/water/setGoal", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.ok) {
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getWaterGoal = async () => {
  try {
    const response = await fetch("http://localhost:5000/water/getGoal", {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      return result.data;
    } else {
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
};
