"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/context/authContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const { push } = useRouter();
  const { isAuthenticated } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isAuthenticated) {
        push("/dashboard");
      } else {
        push("/");
        setLoading(false);
      }
    }
  }, [isAuthenticated, push]);

  if (loading) {
    return <main>Loading...</main>;
  }

  return <main>Hello, this is the default page</main>;
};

export default Page;
