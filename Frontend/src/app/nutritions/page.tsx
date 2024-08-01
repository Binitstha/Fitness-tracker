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
    <main className="m-5 mx-auto flex gap-5 flex-col items-center justify-center">
      <div className="flex w-[88rem] gap-5">
        <section className="flex gap-5">
          <NutritionDash mealData={mealData} setMealData={setMealData} />
        </section>
        <section className="w-full flex justify-center items-center">
          <section className=" w-full rounded-xl h-full border">
            nutritionStat
          </section>
        </section>
      </div>
      <div className="sticky w-[88rem] top-4 rounded-sm flex gap-5">
        <NutritionChart mealData={mealData} />
        <section>water</section>
      </div>
    </main>
  );
};

export default Page;
