"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import { useIsSmallScreen } from "@/hooks/use-is-small-screen";

gsap.registerPlugin(ScrollTrigger);

export const HowItWorks = () => {
  const isSmallScreen = useIsSmallScreen();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const backgroundLineRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile-specific refs
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const mobileBackgroundLineRef = useRef<HTMLDivElement>(null);
  const mobileCirclesRef = useRef<(HTMLDivElement | null)[]>([]);

  const timelineInstanceRef = useRef<gsap.core.Timeline | null>(null);
  const [lineTopOffset, setLineTopOffset] = useState<number | null>(null);
  const [lineHeight, setLineHeight] = useState<number | null>(null);
  const [lineLeftOffset, setLineLeftOffset] = useState<number | null>(null);

  // Function to calculate and update line positions
  const updateLinePositions = useCallback(() => {
    // Use small screen or desktop refs based on current layout
    const currentTimelineRef = isSmallScreen ? mobileTimelineRef : timelineRef;
    const currentLineRef = isSmallScreen ? mobileLineRef : lineRef;
    const currentBackgroundLineRef = isSmallScreen
      ? mobileBackgroundLineRef
      : backgroundLineRef;
    const currentCirclesRef = isSmallScreen ? mobileCirclesRef : circlesRef;

    if (
      !currentTimelineRef.current ||
      !currentLineRef.current ||
      currentCirclesRef.current.length === 0
    )
      return;

    // Calculate the first circle's Y position
    const firstCircle = currentCirclesRef.current[0];
    if (!firstCircle) return;

    const absoluteDiv = firstCircle.parentElement;
    if (!absoluteDiv) return;

    const stepContainer = absoluteDiv.parentElement;
    if (!stepContainer) return;

    // Calculate first circle's center Y position relative to timeline container
    const firstCircleRect = firstCircle.getBoundingClientRect();
    const timelineRect = currentTimelineRef.current.getBoundingClientRect();
    const firstCircleCenterY =
      firstCircleRect.top + firstCircleRect.height / 2 - timelineRect.top;
    const firstCircleCenterX =
      firstCircleRect.left + firstCircleRect.width / 2 - timelineRect.left;

    // Calculate the last circle's Y position
    const lastCircle =
      currentCirclesRef.current[currentCirclesRef.current.length - 1];
    if (!lastCircle) return;

    const lastCircleRect = lastCircle.getBoundingClientRect();
    const lastCircleCenterY =
      lastCircleRect.top + lastCircleRect.height / 2 - timelineRect.top;

    // Calculate line height from first to last circle
    const calculatedLineHeight = lastCircleCenterY - firstCircleCenterY;

    // Set the line top offset to match the first circle's center Y position
    const lineStartOffset = firstCircleCenterY;
    setLineTopOffset(lineStartOffset);
    setLineHeight(calculatedLineHeight);

    // Set the line left offset to match the first circle's center X position
    // Subtract half the line width (1px) to center the line on the circle
    const lineLeftPosition = firstCircleCenterX - 1;
    setLineLeftOffset(lineLeftPosition);

    // Update line positions and heights directly via refs
    if (currentBackgroundLineRef.current) {
      currentBackgroundLineRef.current.style.top = `${lineStartOffset}px`;
      currentBackgroundLineRef.current.style.left = `${lineLeftPosition}px`;
      currentBackgroundLineRef.current.style.height = `${calculatedLineHeight}px`;
    }
    if (currentLineRef.current) {
      currentLineRef.current.style.top = `${lineStartOffset}px`;
      currentLineRef.current.style.left = `${lineLeftPosition}px`;
    }

    return {
      lineStartOffset,
      lineHeight: calculatedLineHeight,
      lineLeftPosition,
    };
  }, [isSmallScreen]);

  // Function to create/update the animation timeline
  const createAnimation = useCallback(() => {
    // Use small screen or desktop refs based on current layout
    const currentTimelineRef = isSmallScreen ? mobileTimelineRef : timelineRef;
    const currentLineRef = isSmallScreen ? mobileLineRef : lineRef;
    const currentCirclesRef = isSmallScreen ? mobileCirclesRef : circlesRef;

    if (
      !sectionRef.current ||
      !currentTimelineRef.current ||
      !currentLineRef.current ||
      currentCirclesRef.current.length === 0
    )
      return;

    // Kill existing timeline and its ScrollTrigger if it exists
    if (timelineInstanceRef.current) {
      const scrollTrigger = timelineInstanceRef.current.scrollTrigger;
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      timelineInstanceRef.current.kill();
      timelineInstanceRef.current = null;
    }

    // Update line positions
    const lineData = updateLinePositions();
    if (!lineData) return;

    const { lineStartOffset, lineHeight } = lineData;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        end: "bottom 70%",
        scrub: 1,
      },
    });

    timelineInstanceRef.current = timeline;

    // Calculate the position of each circle relative to the timeline container
    const timelineRectForAnimation =
      currentTimelineRef.current.getBoundingClientRect();
    const circlePositions = currentCirclesRef.current
      .map((circle) => {
        if (!circle) return null;

        // Calculate circle's center Y position relative to timeline container
        const circleRect = circle.getBoundingClientRect();
        const circleCenterY =
          circleRect.top + circleRect.height / 2 - timelineRectForAnimation.top;

        // Calculate position relative to where the line starts (lineStartOffset from top)
        const circlePositionFromLineStart = circleCenterY - lineStartOffset;

        // Convert to progress (0 to 1) based on the line's height
        // The line animates from 0 to lineHeight, so we calculate progress
        // based on how far the circle is from the line start
        const progress = Math.min(
          1,
          Math.max(0, circlePositionFromLineStart / lineHeight)
        );

        return {
          element: circle,
          position: circleCenterY,
          progress: progress, // Progress from 0 to 1
        };
      })
      .filter((pos): pos is NonNullable<typeof pos> => pos !== null);

    // Animate the line filling down
    timeline.to(currentLineRef.current, {
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
  }, [updateLinePositions, isSmallScreen]);

  useEffect(() => {
    const currentTimelineRef = isSmallScreen ? mobileTimelineRef : timelineRef;
    const currentLineRef = isSmallScreen ? mobileLineRef : lineRef;
    const currentCirclesRef = isSmallScreen ? mobileCirclesRef : circlesRef;

    if (
      !sectionRef.current ||
      !currentTimelineRef.current ||
      !currentLineRef.current ||
      currentCirclesRef.current.length === 0
    )
      return;

    // Wait for next frame to ensure layout is complete
    requestAnimationFrame(() => {
      createAnimation();
    });

    return () => {
      if (timelineInstanceRef.current) {
        timelineInstanceRef.current.kill();
        timelineInstanceRef.current = null;
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [createAnimation, isSmallScreen]);

  // Handle window resize
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateOnResize = () => {
      // Recreate animation with new positions and heights
      createAnimation();
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();
    };

    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateOnResize, 150);
    };

    window.addEventListener("resize", debouncedUpdate);

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, [createAnimation]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto px-5 pt-20 pb-[140px] overflow-hidden"
    >
      <h2
        className={cn(
          playfairDisplay.className,
          "text-[40px] md:text-[52px] leading-[1.2] md:leading-[1.23] tracking-[-0.01em] text-(--text-strong) text-center"
        )}
      >
        How It Works
      </h2>
      <p className="text-base md:text-lg leading-[1.62] md:leading-[1.67] text-(--text-surface) text-center mt-5 md:mt-6 mb-8 md:mb-[63px]">
        Better Quality. Lower Cost. Simple Steps.
      </p>

      {isSmallScreen ? (
        /* Small Screen Layout: Timeline on left, content on right */
        <div ref={mobileTimelineRef} className="relative max-w-full mx-auto">
          {/* Vertical timeline line - background (always visible) */}
          <div
            ref={mobileBackgroundLineRef}
            className="absolute w-[2px] bg-(--stroke-soft) block z-0"
            style={{
              top: lineTopOffset !== null ? `${lineTopOffset}px` : "127px",
              left: lineLeftOffset !== null ? `${lineLeftOffset}px` : "0px",
              height: lineHeight !== null ? `${lineHeight}px` : "930px",
            }}
          />
          {/* Vertical timeline line - animated fill (grows on scroll) */}
          <div
            ref={mobileLineRef}
            className="absolute w-[2px] block z-1"
            style={{
              top: lineTopOffset !== null ? `${lineTopOffset}px` : "127px",
              left: lineLeftOffset !== null ? `${lineLeftOffset}px` : "0px",
              height: 0,
              transformOrigin: "top",
              background: "var(--timeline-gradient)",
            }}
          />

          {/* Steps */}
          <div className="space-y-[63px] pl-20">
            {howItWorksData.map((step, index) => {
              return (
                <div key={step.id} className="relative flex items-start gap-4">
                  {/* Circle on timeline */}
                  <div className="absolute left-[-59px] top-0 flex items-center justify-center z-20">
                    <div
                      ref={(el) => {
                        mobileCirclesRef.current[index] = el;
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

                  {/* Content on right */}
                  <div className="flex-1 flex flex-col gap-4">
                    {/* Image */}
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={275}
                      height={178}
                      className="w-[275px] h-[178px] md:w-[380px] md:h-[247px] object-cover"
                    />

                    {/* Text Content */}
                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-[40px] leading-[1.33] md:leading-[1.2] text-(--text-strong) font-medium tracking-[-0.01em]">
                        {step.title}
                      </h3>
                      <p className="leading-[1.62] md:leading-[1.67] text-base md:text-lg text-(--text-surface)">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Desktop Layout: Centered timeline with alternating content */
        <div ref={timelineRef} className="relative max-w-[960px] mx-auto">
          {/* Vertical timeline line - background (always visible) */}
          <div
            ref={backgroundLineRef}
            className="absolute w-[2px] bg-(--stroke-soft) block z-0"
            style={{
              top: lineTopOffset !== null ? `${lineTopOffset}px` : "127px",
              left: lineLeftOffset !== null ? `${lineLeftOffset}px` : "50%",
              height: lineHeight !== null ? `${lineHeight}px` : "930px",
            }}
          />
          {/* Vertical timeline line - animated fill (grows on scroll) */}
          <div
            ref={lineRef}
            className="absolute w-[2px] block z-1"
            style={{
              top: lineTopOffset !== null ? `${lineTopOffset}px` : "127px",
              left: lineLeftOffset !== null ? `${lineLeftOffset}px` : "50%",
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
                    <h3 className="text-2xl md:text-[40px] leading-[1.33] md:leading-[1.2] text-(--text-strong) font-medium tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <p className="leading-[1.62] md:leading-[1.67] text-base md:text-lg text-(--text-surface)">
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
      )}

      {/* Gradient backgrounds */}
      <HowItWorksBlueGradient className="absolute -bottom-1/4 left-1/4 -translate-x-1/3 pointer-events-none" />
      <HowItWorksGreenGradient className="absolute -bottom-1/4 right-1/4 translate-x-1/3 pointer-events-none" />
    </section>
  );
};
