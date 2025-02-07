"use client";

import { motion, useInView } from "framer-motion";
import { Smartphone, BarChart2, Trophy } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: <Smartphone size={48} />,
    title: "Track Your Activities",
    description:
      "Log your workouts, meals, and daily activities with ease using our intuitive web app.",
  },
  {
    icon: <BarChart2 size={48} />,
    title: "Analyze Your Progress",
    description:
      "Get detailed insights and visualizations of your fitness journey to stay motivated and on track.",
  },
  {
    icon: <Trophy size={48} />,
    title: "Achieve Your Goals",
    description:
      "Set personalized goals and celebrate your achievements as you reach new fitness milestones.",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger animation once when section is visible

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="w-full px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 ">
          How MyFitPal Works
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2, duration: 3 },
            },
          }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 1 }}
            >
              <div className=" mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 ">{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
