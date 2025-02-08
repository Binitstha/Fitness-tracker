"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Video from "../ui/video";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";

const Hero = () => {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]);
  const blur = useTransform(scrollY, [0, 400], ["0px", "15px"]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.2]);
  const textOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const textY = useTransform(scrollY, [0, 200], [0, -50]);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <motion.div
        style={{ opacity, filter: blur, scale }}
        className="absolute inset-0 w-full h-full -z-10"
      >
        <Video
          controls={false}
          height={720}
          width={1280}
          source="/hero.mp4"
          classname="object-cover h-full w-full -scale-x-[1] dark:opacity-80"
        />
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="size-full flex flex-col gap-6 font-semibold items-start justify-center px-72 text-white"
      >
        <h1 className="text-6xl">
          Your Personal Fitness <br /> Journey Starts Here
        </h1>

        <h3 className="text-gray-200 text-xl">
          Track your progress, set goals, and achieve results with MyFitPal.
        </h3>

        <div className="flex gap-10 mt-3">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">
              <CountUp start={0} end={100} duration={3} suffix="K+" />
            </span>
            <span className="text-gray-300">Active Users</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">
              <CountUp start={0} end={10} duration={3} suffix="M+" />
            </span>
            <span className="text-gray-300">Workouts Tracked</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">
              <CountUp start={0} end={500} duration={3} suffix="M+" />
            </span>
            <span className="text-gray-300">Calories Burned</span>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Link href="/auth/signup">
            <Button className="w-fit text-black bg-white shadow-lg shadow-gray-500/40 hover:bg-gray-200">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default Hero;
