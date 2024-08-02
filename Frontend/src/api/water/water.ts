import { waterType } from "@/types/types";

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
      return result.data;
    } else {
      console.log(result.message);
    }
  } catch (error) {
    console.log(error);
  }
};
