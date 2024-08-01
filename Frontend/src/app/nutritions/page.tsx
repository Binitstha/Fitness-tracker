"use client";

import NutritionChart from "@/components/nutritions/nutritionChart";
import NutritionDash from "@/components/nutritions/nutritionsDash";
import { useSession } from "@/context/authContext";
import { mealDataType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useSession();
  const [mealData, setMealData] = useState<mealDataType[]>([]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, loading, router]);

  return (
    <main className="m-5 mx-auto flex gap-5 justify-center">
      <div className="flex flex-col w-[67rem] gap-5">
        <section className="flex gap-5">
          <NutritionDash mealData={mealData} setMealData={setMealData} />
        </section>
        <section className="border rounded-md w-full flex justify-center items-center">
          <NutritionChart mealData={mealData} />
        </section>
      </div>
      <div className="sticky top-4 w-80 border rounded-sm flex flex-col gap-5">
        <section>nutritionStat</section>
        <section>water</section>
      </div>
    </main>
  );
};

export default Page;
