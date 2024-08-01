"use client";

import NutritionDash from "@/components/nutritions/nutritionsDash";
import { useSession } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useSession();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, loading, router]);

  return (
    <main className="m-5 mx-auto flex gap-5 justify-center">
      <div className="flex flex-col w-[67rem] gap-5">
        <section className="flex gap-5">
          <NutritionDash />
        </section>
        <section className="border rounded-md w-full flex justify-center items-center">
          chart
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
