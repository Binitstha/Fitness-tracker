"use client";

import NutritionChart from "@/components/nutritions/nutritionChart";
import NutritionDash from "@/components/nutritions/nutritionsDash";
import NutritionStat from "@/components/nutritions/nutritionStat";
import Water from "@/components/nutritions/water";
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
          <section className=" w-full h-full">
            <NutritionStat mealData={mealData}/>
          </section>
        </section>
      </div>
      <div className=" w-[88rem] flex gap-5">
        <NutritionChart mealData={mealData} />
        <section className="w-[27rem]"><Water/></section>
      </div>
    </main>
  );
};

export default Page;
