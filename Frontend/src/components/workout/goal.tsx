"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useState, useEffect } from "react";

const Goal = ({ goalData }) => {
  const [goal, setGoal] = useState(goalData); // Assume goalData is fetched from the server
  const [currentCalories, setCurrentCalories] = useState(goal.currentCalories);

  useEffect(() => {
    // Logic to fetch the latest goal data, including achievements
    // setGoal(fetchedGoalData);
  }, []);

  const progress = (currentCalories / goal.targetCalories) * 100;

  const handleSetGoal = () => {
    // Logic to set a new goal
  };

  return (
    <Card className="w-[350px] p-5 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Calorie Goal</CardTitle>
        <CardDescription className="text-gray-500">Set and track your calorie-burning goal.</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="my-4">
          <Progress value={progress} className="w-full h-4 rounded-full" />
          <p className="mt-2 text-sm">{currentCalories} / {goal.targetCalories} calories burned</p>
        </div>
        <div className="my-4">
          <Button onClick={handleSetGoal} className="w-full bg-blue-500 text-white">Set New Goal</Button>
        </div>
        <div className="mt-6">
          <p className="text-gray-600 italic">"Keep going! Every step counts."</p>
        </div>
        <div className="mt-6">
          <p className="text-sm font-bold">Achievement Badges:</p>
          <div className="flex justify-center gap-2 mt-2">
            {goal.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-yellow-400 p-2 rounded-full">
                🏅 {achievement.title}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Goal;
