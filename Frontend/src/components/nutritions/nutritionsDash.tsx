import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Separator } from "../ui/separator";
import Autoplay from "embla-carousel-autoplay";
import { combinedFoodItems, foodItems } from "@/lib/foodItems";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { CombinedFoodItem, FoodItem } from "@/types/types";
import { addMeal, getMeal } from "@/api/meal/meal";
import { z } from "zod";
import { formatDate } from "@/lib/utils";

const animatedComponents = makeAnimated();

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

type mealDataType = {
  name: string;
  date: string;
  totalCalories: number;
  category: string;
};

const NutritionDash = () => {
  const [dailyRoutineMessage, setDailyRoutineMessage] = useState("");
  const [foodType, setFoodType] = useState("");
  const { theme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mealData, setMealData] = useState<mealDataType[]>([]);

  useEffect(() => {
    setDailyRoutineMessage(getMessageForTime(setFoodType));
    const fetchMealData = async () => {
      const data = await getMeal();
      setMealData(data);
    };
    fetchMealData();
  }, []);
  console.log(mealData);

  const recommendedFoods = combinedFoodItems.filter(
    (item) => item.category === foodType,
  );

  const formSchema = z.object({
    title: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name must be less than 100 characters"),
    meals: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .min(1, "At least one meal is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      meals: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const selectedMeals = data.meals.map((meal) => meal.value);
    const selectedFoodItems = foodItems.filter((item) =>
      selectedMeals.includes(item.name),
    );

    const totalProtein = selectedFoodItems.reduce(
      (sum, item) => sum + item.protein,
      0,
    );
    const totalCalories = selectedFoodItems.reduce(
      (sum, item) => sum + item.calories,
      0,
    );
    const totalCarbs = selectedFoodItems.reduce(
      (sum, item) => sum + item.carbs,
      0,
    );
    const totalFats = selectedFoodItems.reduce(
      (sum, item) => sum + item.fats,
      0,
    );

    const foods = data.meals.map((item) => item.value);

    const mealData = {
      name: data.title,
      category: foodType,
      totalProtein,
      totalCalories,
      totalCarbs,
      totalFats,
      foods,
    };

    try {
      await addMeal(mealData);
      setMealData((prevMealData) => [
        ...prevMealData,
        {
          name: mealData.name,
          category: foodType,
          totalCalories: mealData.totalCalories,
          date: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }

    console.log(mealData);
    setIsDialogOpen(false);
  };

  const options = foodItems.map((item: FoodItem) => ({
    value: item.name,
    label: item.name,
  }));

  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#0c0a09" : "#fff",
      color: theme === "dark" ? "#0c0a09" : "#000",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#0c0a09" : "#fff",
      borderRadius: "8px",
    }),
    input: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#fff" : "#000",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#333"
          : "#eee"
        : theme === "dark"
          ? "#0c0a09"
          : "#fff",
      color: state.isFocused
        ? theme === "dark"
          ? "#fff"
          : "#000"
        : theme === "dark"
          ? "#fff"
          : "#000",
      borderRadius: "4px",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#fff" : "#000",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#555" : "#e0e0e0",
      borderRadius: "4px",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#fff" : "#000",
    }),
  };

  const onAddCombinedFood = async (food: CombinedFoodItem) => {
    const { servingSize, ...excludingServingSize } = food;
    try {
      await addMeal(excludingServingSize);
      setMealData((prevMealData) => [
        ...prevMealData,
        {
          name: excludingServingSize.name,
          category: foodType,
          totalCalories: excludingServingSize.totalCalories,
          date: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="border flex justify-evenly w-full p-4 rounded-xl">
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
                      <Card className=" h-[15.5rem] flex flex-col justify-between">
                        <CardHeader className="w-40">
                          <CardTitle className=" text-ellipsis overflow-hidden whitespace-nowrap w-[10rem]">
                            {food.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid text-xs w-full items-center gap-4">
                            <div className="flex flex-wrap justify-between">
                              <p>Protein: {food.totalProtein}g</p>
                              <p>Calories: {food.totalCalories}</p>
                              <p>Carbs: {food.totalCarbs}g</p>
                              <p>Fats: {food.totalFats}g</p>
                            </div>
                            <p>Serving Size: {food.servingSize}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button onClick={() => onAddCombinedFood(food)}>
                            Add {foodType}
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="mt-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => form.reset()}>
                    Add Your Own{" "}
                    {foodType.charAt(0).toUpperCase() + foodType.slice(1)}
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-96">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6 p-4"
                    >
                      <DialogHeader>
                        <DialogTitle>Add a New Meal</DialogTitle>
                        <DialogDescription>
                          Fill out the details below to add a new meal to your
                          list. Click &quot;Save&quot; to submit.
                        </DialogDescription>
                      </DialogHeader>
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="title">Meal Title</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                id="title"
                                placeholder="Enter meal title"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="meals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="meals">Select Foods</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                className="bg-gray-100 dark:bg-gray-800"
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={options}
                                styles={customStyles}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
        <Separator orientation="vertical" className="mx-4" />
        <section className="flex items-start justify-center w-96 p-4rounded-lg shadow-md">
          {mealData && <MealHistory mealData={mealData} />}
        </section>
      </main>
    </>
  );
};

const MealHistory = ({ mealData }: { mealData: mealDataType[] }) => {
  return (
    <Card className="w-52">
      <CardHeader>
        <CardTitle>Meal History</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {mealData.slice(0,3).map((meal: mealDataType, index: number) => (
            <>
              <div
                key={index}
                className="mb-4 grid items-start pb-4 last:mb-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium flex justify-between items-center leading-none">
                    <span className=" text-ellipsis overflow-hidden whitespace-nowrap w-24 capitalize">
                      {meal.category}
                    </span>
                    <span>{meal.totalCalories}kcal</span>
                  </p>
                  <p className=" text-sm">{meal.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(meal.date)}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionDash;
