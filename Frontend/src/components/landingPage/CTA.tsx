"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-primary dark:bg-white dark:text-black bg-black text-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8">
            Join MyFitPal today and transform your life with our powerful
            fitness tracking tools.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
