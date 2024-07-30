import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "../ui/carousel";
import { Separator } from "../ui/separator";
import Autoplay from "embla-carousel-autoplay";
import { combinedFoodItems } from "@/lib/foodItems";

const getMessageForTime = (setFoodType: (foodType: string) => void): string => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 10) {
    setFoodType("breakfast");
    return "Good Morning! It's breakfast time. Have a healthy start to your day.";
  } else if (hour >= 10 && hour < 14) {
    setFoodType("lunch");
    return "It's lunchtime! Enjoy a nutritious meal to keep you energized.";
  } else if (hour >= 14 && hour < 18) {
    setFoodType("snack");
    return "Good Afternoon! How about a healthy snack to keep you going?";
  } else if (hour >= 18 && hour < 21) {
    setFoodType("dinner");
    return "It's dinner time! Enjoy a balanced meal to end your day.";
  } else {
    setFoodType("beverage");
    return "Good Evening! Don't forget to stay hydrated and eat something light.";
  }
};

const NutritionDash = () => {
  const [dailyRoutineMessage, setDailyRoutineMessage] = useState<string>("");
  const [foodType, setFoodType] = useState<string>("");

  useEffect(() => {
    setDailyRoutineMessage(getMessageForTime(setFoodType));
  }, []);

  const recommendedFoods = combinedFoodItems.filter(
    (item) => item.category === foodType,
  );

  return (
    <>
      <main className="border flex justify-evenly w-full p-3 rounded-md">
        <section className="">
          <h1 className="text-xl font-bold mb-4">{dailyRoutineMessage}</h1>
          <div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {recommendedFoods.map((food, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <div className="text-xs flex flex-col gap-3">
                            <h3 className="text-xl font-bold">{food.name}</h3>
                            <div className="flex flex-wrap justify-between">
                              <p>Protein: {food.totalProtein}g</p>
                              <p>Calories: {food.totalCalories}</p>
                              <p>Carbs: {food.totalCarbs}g</p>
                              <p>Fats: {food.totalFats}g</p>
                            </div>
                            <p>Serving Size: {food.servingSize}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="mt-4">
              <Button>
                Add Your Own{" "}
                {foodType.charAt(0).toUpperCase() + foodType.slice(1)}
              </Button>
            </div>
          </div>
        </section>
        <Separator orientation="vertical" className="mx-4" />
        <section className="flex flex-col items-center justify-center w-96">
          <h2 className="text-lg font-bold mb-2">Meal List</h2>
          <ul className="list-disc list-inside">
            {recommendedFoods.map((food, index) => (
              <li key={index}>{food.name}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default NutritionDash;
