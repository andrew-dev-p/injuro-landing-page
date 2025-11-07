"use client";

import { Button } from "../ui";
import { HeroGraphics } from "../svgs/hero-graphics";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { playfairDisplay } from "@/app/fonts";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative bg-(--bg-blue-soft) rounded-4xl mx-3 flex flex-col items-center justify-center gap-14 py-45 overflow-hidden px-5">
      <Image
        src="/images/noise.png"
        alt="Hero Background"
        fill
        className="object-cover mix-blend-soft-light w-full z-0"
      />
      <div className="absolute top-0 left-0 w-full h-full z-[1]">
        <HeroGraphics />
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "z-10 text-center text-5xl leading-[1.23] md:text-7xl md:leading-[1.31] tracking-[-0.01em] text-(--text-strong)",
          playfairDisplay.className
        )}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Personal Injury Pre-litigation
        </motion.span>
        <br />
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="italic text-(--text-label)"
        >
          so powerful, it beats the rest.
        </motion.span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 text-(--text-strong) text-center text-base leading-[1.62] md:text-2xl md:leading-normal max-w-[660px]"
      >
        Higher quality results, lower costs. Injuro helps you win more while
        keeping more money in your pocket.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <Button className="h-12 py-3 px-4">Schedule a Call</Button>
      </motion.div>
    </section>
  );
};
