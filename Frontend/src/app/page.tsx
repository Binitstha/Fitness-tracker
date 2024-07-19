"use client";
import { useSession } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { isAuthenticated, login } = useSession();

  const router = useRouter();
  
  useEffect(() => {
    console.log(isAuthenticated)
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <main></main>
    </>
  );
};

export default Page;
