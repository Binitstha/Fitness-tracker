import { Card, CardContent } from "../ui/card";
import { mealDataType, User } from "@/types/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Array of quotes
const quotes = [
  "The only bad workout is the one you didn’t do.",
  "Fitness is not about being better than someone else; it’s about being better than you used to be.",
  "Exercise is a celebration of what your body can do, not a punishment for what you ate.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Don’t count the days. Make the days count.",
  "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.",
  "Push yourself, because no one else is going to do it for you.",
  "Success is what comes after you stop making excuses.",
  "Your body can stand almost anything. It’s your mind that you have to convince.",
  "If it doesn’t challenge you, it won’t change you.",
  "You are only one workout away from a good mood.",
  "You don’t have to be great to start, but you have to start to be great.",
];

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1.5; // Duration of animation in seconds
    const startTime = performance.now();

    const update = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setDisplayValue(Math.round(progress * value));
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [value]);

  return (
    <motion.span
      key={displayValue}
      initial={{ opacity: 0.8, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
      className="font-bold"
    >
      {displayValue}
    </motion.span>
  );
};

// Dashboard Component
const Dashboard = ({
  user,
  mealData,
}: {
  user: User;
  mealData: mealDataType[];
}) => {
  const dailyQuote = getRandomQuote();

  // Calculate total calories consumed
  const totalCaloriesConsumed = mealData.reduce(
    (acc, meal) => acc + meal.totalCalories,
    0,
  );

  // Calculate average calories burned
  // Assuming a fixed value for calories burned for simplicity. Update this based on actual data if available.
  const totalCaloriesBurned = 1800; // Replace with actual data if available
  const averageCaloriesBurned = totalCaloriesBurned / mealData.length;

  const totalProtien = mealData.reduce(
    (acc, meal) => acc + meal.totalProtein,
    0,
  );

  const totalCarbs = mealData.reduce(
    (acc, meal) => acc + meal.totalCarbs,
    0,
  );
  const totalFat = mealData.reduce(
    (acc, meal) => acc + meal.totalFats,
    0,
  );
  return (
    <Card className="shadow-md rounded-xl w-[60rem] mx-auto">
      <CardContent className="flex flex-col lg:flex-row h-full justify-between p-6 rounded-xl">
        <main className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 w-full">
          <section className="flex flex-col items-start justify-center w-full lg:w-[50%] p-6">
            <h1 className="text-2xl font-semibold mb-2">
              Hello,{" "}
              <span className="text-4xl font-bold">
                {user.firstName} {user.lastName}
              </span>
            </h1>
            <p className="text-gray-500 italic text-lg">
              &quot;{dailyQuote}&quot;
            </p>
          </section>

          <section className="flex flex-col lg:flex-row w-full lg:w-[48%]">
            <div className="p-4 text-center flex flex-col gap-6 w-[63%]">
              <div className="flex flex-col gap-4 items-center justify-center">
                <p className="text-lg font-medium">Calories consumed 🌯</p>
                <p className="text-4xl flex gap-1 items-end">
                  <AnimatedNumber value={totalCaloriesConsumed} />
                  <span className="text-sm">Kcal</span>
                </p>
              </div>
              <div className="flex flex-col gap-4 items-center justify-center">
                <p className="text-lg font-medium">Avg calories burned 🔥</p>
                <p className="text-4xl flex gap-1 items-end">
                  <AnimatedNumber value={Math.round(averageCaloriesBurned)} />
                  <span className="text-sm">Kcal</span>
                </p>
              </div>
            </div>
            <div className="p-4 flex flex-col justify-center items-center">
              <h3 className="text-lg flex flex-col justify-center items-center font-semibold mb-4">
                <span>Total</span> 
                <span>Nutrition Stats</span>
              </h3>
              <p className="text-lg">
                Protein: <AnimatedNumber value={150} />g
              </p>
              <p className="text-lg">
                Carbs: <AnimatedNumber value={200} />g
              </p>
              <p className="text-lg">
                Fat: <AnimatedNumber value={70} />g
              </p>
            </div>
          </section>
        </main>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
