"use client";

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

  return <main>Hello, this is the dashboard page</main>;
};

export default Page;
