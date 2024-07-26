"use client";

import { getWorkouts } from "@/api/workout/workout";
import AddWorkout from "@/components/workout/addWorkout";
import WorkOutChart from "@/components/workout/workoutChart";
import WorkoutList from "@/components/workout/workoutLIst";
import { useSession } from "@/context/authContext";
import { workoutType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useSession();

  const [workoutData, setWorkoutData] = useState<workoutType[]>([]);
  const [addWorkout, setAddWorkout] = useState<Boolean>(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
      }
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWorkouts();
        setWorkoutData(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchData();
  }, [addWorkout]);

  const handleAddWorkout = () => {
    setAddWorkout((prev) => !prev);
  };

  const handleUpdateWorkout = () => {
    setAddWorkout((prev) => !prev); // Toggle the state to trigger re-fetch
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="m-5 mx-28 flex gap-5 justify-center">
      <div className="flex flex-col w-[65rem] gap-5">
        <section className="flex gap-5">
          <WorkoutList workoutData={workoutData} setWorkoutData={setWorkoutData} onWorkoutUpdate={handleUpdateWorkout} />
        </section>
        <section className="border rounded-md w-full flex justify-center items-center">
          <WorkOutChart />
        </section>
      </div>
      <div className="sticky top-4">
        <section>
          <AddWorkout onAddWork={handleAddWorkout} />
        </section>
      </div>
    </main>
  );
};

export default Page;
