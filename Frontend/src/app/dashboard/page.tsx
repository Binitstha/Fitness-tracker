"use client";

import { useSession } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated,user } = useSession();

  useEffect(() => {
    console.log("page", isAuthenticated);
    console.log(user)
    if (!isAuthenticated) {

      router.push("/auth/login");
    }
  }, [isAuthenticated,user, router]);

  return <main>Hello, this is the dashboard page</main>;
};

export default Page;
