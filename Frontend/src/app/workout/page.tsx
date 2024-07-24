"use client";

import AddWorkout from "@/components/workout/addWorkout";
import WorkOutChart from "@/components/workout/workoutChart";
import WorkoutList from "@/components/workout/workoutLIst";
import { useSession } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useSession();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
      }
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="m-10 mx-28 flex gap-5 justify-center">
      <div className="flex flex-col w-[65rem] gap-5">
        <section className="flex gap-5">
          <WorkoutList />
        </section>
        <section className=" border rounded-md w-full flex justify-center items-center">
          <WorkOutChart />
        </section>
      </div>
      <div className="sticky">
        <section>
          <AddWorkout />
        </section>
      </div>
    </main>
  );
};

export default Page;
