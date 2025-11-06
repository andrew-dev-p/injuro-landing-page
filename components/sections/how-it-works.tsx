"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { playfairDisplay } from "@/app/fonts";
import { howItWorksData } from "@/lib/data";
import {
  HowItWorksBlueGradient,
  HowItWorksGreenGradient,
} from "@/components/svgs";

gsap.registerPlugin(ScrollTrigger);

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !timelineRef.current ||
      !lineRef.current ||
      circlesRef.current.length === 0
    )
      return;

    // Wait for next frame to ensure layout is complete
    const updateAnimation = () => {
      if (!timelineRef.current || !lineRef.current) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "bottom 70%",
          scrub: 1,
        },
      });

      // The line starts at top-[127px] and has height of 930px
      const lineStartOffset = 127;
      const lineHeight = 930; // Match the background line height

      // Calculate the position of each circle relative to the timeline container
      const circlePositions = circlesRef.current
        .map((circle) => {
          if (!circle) return null;

          // The circle is inside: circle -> absolute div -> step container -> steps wrapper -> timelineRef
          const absoluteDiv = circle.parentElement;
          if (!absoluteDiv) return null;

          const stepContainer = absoluteDiv.parentElement;
          if (!stepContainer) return null;

          // Calculate position relative to timeline container
          // The circle is positioned at 50% of the step container height (top-1/2)
          const stepTop = stepContainer.offsetTop;
          const stepHeight = stepContainer.offsetHeight;
          const circleTop = stepTop + stepHeight / 2;

          // Calculate position relative to where the line starts (lineStartOffset from top)
          const circlePositionFromLineStart = circleTop - lineStartOffset;

          // Convert to progress (0 to 1) based on the line's height
          // The line animates from 0 to lineHeight, so we calculate progress
          // based on how far the circle is from the line start
          const progress = Math.min(
            1,
            Math.max(0, circlePositionFromLineStart / lineHeight)
          );

          return {
            element: circle,
            position: circleTop,
            progress: progress, // Progress from 0 to 1
          };
        })
        .filter((pos): pos is NonNullable<typeof pos> => pos !== null);

      // Animate the line filling down
      // Use the actual line height (930px) to match the background line
      timeline.to(lineRef.current, {
        height: lineHeight,
        duration: 1,
        ease: "none",
      });

      // Animate circles activating when the line reaches them
      circlePositions.forEach((circleData) => {
        const { element: circle, progress } = circleData;

        if (!circle) return;

        // Get the inner layer (span with number)
        const innerLayer = circle.querySelector("span");

        // Animate outer layer: change background to gradient
        timeline.to(
          circle,
          {
            background: "linear-gradient(180deg, #77debe 0%, #52abde 100%)",
            duration: 0.01, // Very short duration to sync with line
            ease: "none",
          },
          progress
        );

        // Animate inner layer: change background from black to #1eb792
        if (innerLayer) {
          timeline.to(
            innerLayer,
            {
              backgroundColor: "#1eb792",
              duration: 0.01,
              ease: "none",
            },
            progress
          );
        }

        // Pop animation: scale up then back down
        timeline.to(
          circle,
          {
            scale: 1.15,
            duration: 0.15,
            ease: "power2.out",
          },
          progress
        );
        timeline.to(
          circle,
          {
            scale: 1.0,
            duration: 0.15,
            ease: "power2.in",
          },
          progress + 0.15
        );
      });
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(updateAnimation);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto px-5 pt-20 pb-[140px] overflow-hidden"
    >
      <h2
        className={cn(
          playfairDisplay.className,
          "text-[52px] leading-[1.23] tracking-[-0.01em] text-(--text-strong) text-center"
        )}
      >
        How It Works
      </h2>
      <p className="text-lg leading-[1.67] text-(--text-surface) text-center mt-6 mb-[63px]">
        Better Quality. Lower Cost. Simple Steps.
      </p>
      <div ref={timelineRef} className="relative max-w-[960px] mx-auto">
        {/* Vertical timeline line - background (always visible) */}
        <div className="absolute left-1/2 h-[930px] top-[127px] w-[2px] bg-(--stroke-soft) -translate-x-1/2 block z-0" />
        {/* Vertical timeline line - animated fill (grows on scroll) */}
        <div
          ref={lineRef}
          className="absolute left-1/2 top-[127px] w-[2px] -translate-x-1/2 block z-1"
          style={{
            height: 0,
            transformOrigin: "top",
            background: "var(--timeline-gradient)",
          }}
        />

        {/* Steps */}
        <div className="space-y-[63px]">
          {howItWorksData.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.id}
                className={cn(
                  "relative flex items-center justify-between gap-20",
                  isEven && "flex-row-reverse"
                )}
              >
                {/* Circle on timeline */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                  <div
                    ref={(el) => {
                      circlesRef.current[index] = el;
                    }}
                    className="w-10 aspect-square rounded-full flex items-center justify-center transition-colors bg-(--stroke-surface)"
                  >
                    <div className="w-[38px] aspect-square bg-white rounded-full flex items-center justify-center">
                      <span className="h-8 aspect-square bg-(--bg-black) rounded-full flex items-center justify-center font-medium text-lg leading-[1.55] text-center text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 max-w-[380px]">
                  <h3 className="text-[40px] leading-[1.2] text-(--text-strong) font-medium tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="leading-[1.67] text-lg text-(--text-surface)">
                    {step.description}
                  </p>
                </div>

                {/* Image */}
                <Image
                  src={step.image}
                  alt={step.title}
                  width={380}
                  height={247}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Gradient backgrounds */}
      <HowItWorksBlueGradient className="absolute -bottom-1/4 left-1/4 -translate-x-1/3 pointer-events-none" />
      <HowItWorksGreenGradient className="absolute -bottom-1/4 right-1/4 translate-x-1/3 pointer-events-none" />
    </section>
  );
};
