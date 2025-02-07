"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import Footer from "@/components/landingPage/footer";
import Features from "@/components/landingPage/features";
import HowItWorks from "@/components/landingPage/howItWorks";
import Testimonials from "@/components/landingPage/testimonials";
import CTA from "@/components/landingPage/CTA";
import Hero from "@/components/landingPage/hero";
import Blogs from "@/components/landingPage/blogs";

const inter = Inter({ subsets: ["latin"] });

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

  return (
    <main className={inter.className}>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Blogs />
      <CTA />
      <Footer />
    </main>
  );
};

export default Page;
