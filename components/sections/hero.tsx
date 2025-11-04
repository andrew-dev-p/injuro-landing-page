import { Button } from "../ui";
import { HeroGraphics } from "../icons/hero-graphics";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { playfairDisplay } from "@/app/fonts";

export const Hero = () => {
  return (
    <section className="relative bg-(--bg-blue-soft) rounded-4xl mx-3 flex flex-col items-center justify-center gap-14 py-45 overflow-hidden px-5">
      <Image
        src="/images/noise.png"
        alt="Hero Background"
        fill
        className="object-cover mix-blend-soft-light w-full"
      />
      <div className="absolute top-0 left-0 w-full h-full">
        <HeroGraphics />
      </div>
      <h1
        className={cn(
          "z-10 text-center text-5xl leading-[1.23] md:text-7xl md:leading-[1.31] tracking-[-0.01em] text-(--text-strong)",
          playfairDisplay.className
        )}
      >
        Personal Injury Pre-litigation
        <br />
        <span className="italic text-(--text-label)">
          so powerful, it beats the rest.
        </span>
      </h1>
      <p className="z-10 text-(--text-strong) text-center text-md leading-[1.62] md:text-2xl md:leading-normal max-w-[660px]">
        Higher quality results, lower costs. Injuro helps you win more while
        keeping more money in your pocket.
      </p>
      <Button className="z-10 h-12 py-3 px-4">Schedule a Call</Button>
    </section>
  );
};
