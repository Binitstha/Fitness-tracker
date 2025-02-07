"use client";

import { motion, useInView } from "framer-motion";
import { Activity, BarChart2, Calendar, Users } from "lucide-react";
import { Card } from "../ui/card";
import { CardContent } from "@mui/material";
import { useRef } from "react";

const features = [
  {
    icon: <Activity size={24} />,
    title: "Activity Tracking",
    description: "Monitor your daily activities and workouts with precision.",
  },
  {
    icon: <BarChart2 size={24} />,
    title: "Progress Analytics",
    description: "Visualize your fitness journey with detailed charts and insights.",
  },
  {
    icon: <Calendar size={24} />,
    title: "Workout Planner",
    description: "Plan and schedule your workouts for maximum efficiency.",
  },
  {
    icon: <Users size={24} />,
    title: "Community Support",
    description: "Connect with like-minded individuals and share your achievements.",
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger animation once when section is visible

  return (
    <section
      ref={ref}
      id="features"
      className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-gray-100 dark:bg-customGray"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title Animation */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Powerful Features to Boost Your Fitness
        </motion.h2>

        {/* Grid Animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.5, duration: 2 },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="h-48 shadow-lg shadow-gray-400/30 dark:shadow-gray-800/30">
                <CardContent className="flex flex-col items-center justify-center gap-3 h-full">
                  <div className="text-blue-500">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-center text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
