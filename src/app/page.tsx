"use client";
import { HeroScrollDemo } from "@/components/HeroScrollDemo";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Navbar />
      <section>
        <motion.div
          className="flex flex-col items-center justify-center h-[40vh]"
          initial={{ opacity: 0, y: 30 }} // Start position (hidden + moved down)
          animate={{ opacity: 1, y: 0 }} // End position (visible + moved up)
          transition={{ duration: 0.8, ease: "easeIn" }} // Animation settings
        >
          <h1 className="text-7xl font-bold text-center">
            Personal Budget <span className="">Tracker</span>
          </h1>
          <p className="text-center text-muted-foreground text-2xl mt-2">
            AI powered budget tracker app to help you manage your <br />
            finances with ease.
          </p>
        </motion.div>
      </section>

      {/* <section>
        <HeroScrollDemo />
      </section> */}
      <section className="flex items-center justify-center h-screen">
        <h1>Hello</h1>
      </section>
    </div>
  );
}
