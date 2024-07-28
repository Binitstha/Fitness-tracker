"use client";

import { addGoal, getGoal, deleteGoal, updateGoal } from "@/api/goal/goal";
import { deleteWorkout, getWorkouts } from "@/api/workout/workout";
import AddWorkout from "@/components/workout/addWorkout";
import Goal from "@/components/workout/goal";
import WorkOutChart from "@/components/workout/workoutChart";
import WorkoutList from "@/components/workout/workoutLIst";
import { useSession } from "@/context/authContext";
import { goalType, workoutType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useSession();

  const [workoutData, setWorkoutData] = useState<workoutType[]>([]);
  const [addWorkout, setAddWorkout] = useState<boolean>(false);
  const [goalData, setGoalData] = useState<goalType | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getWorkouts();
        setWorkoutData(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkouts();
  }, [addWorkout]);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const goal = await getGoal();
        setGoalData(goal);
      } catch (error) {
        console.error("Error fetching goal:", error);
      }
    };
    fetchGoal();
  }, [addWorkout, workoutData]);

  const handleAddWorkout = () => {
    setAddWorkout((prev) => !prev);
  };

  const handleUpdateWorkout = () => {
    setAddWorkout((prev) => !prev);
  };

  const handleAddGoal = async (
    newGoal: Omit<goalType, "id" | "achieved" | "userId">,
  ) => {
    try {
      const addedGoal = await addGoal(newGoal);
      setGoalData(addedGoal);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleUpdateGoal = async (
    goalId: string,
    updatedGoal: Omit<goalType, "id" | "achieved" | "userId">,
  ) => {
    try {
      await updateGoal(goalId, updatedGoal);
      setGoalData(
        (prevGoalData) =>
          ({
            ...prevGoalData,
            ...updatedGoal,
          }) as goalType,
      );
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="m-5 mx-28 flex gap-5 justify-center">
      <div className="flex flex-col w-[65rem] gap-5">
        <section className="flex gap-5">
          <WorkoutList
            workoutData={workoutData}
            setWorkoutData={setWorkoutData}
            onWorkoutUpdate={handleUpdateWorkout}
          />
        </section>
        <section className="border rounded-md w-full flex justify-center items-center">
          <WorkOutChart workoutData={workoutData} />
        </section>
      </div>
      <div className="sticky top-4 flex flex-col gap-5">
        <section>
          <AddWorkout onAddWork={handleAddWorkout} />
        </section>
        <section>
          <Goal
            goalData={goalData}
            onAddGoal={handleAddGoal}
            onUpdateGoal={handleUpdateGoal}
          />
        </section>
      </div>
    </main>
  );
};

export default Page;
