"use client";

import { cn } from "@/lib/utils";
import { playfairDisplay } from "@/app/fonts";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BeliefStatement = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    const wordSpans = textRef.current.querySelectorAll(".word");
    const imageWrappers = Array.from(
      sectionRef.current.querySelectorAll(".animate-image")
    );

    if (wordSpans.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        scrub: 0.3,
        start: "top 65%",
        end: "bottom 35%",
      },
    });

    timeline.to(wordSpans, {
      opacity: 1,
      duration: 1,
      ease: "none",
      stagger: 1,
    });

    const imageConfig = {
      opacity: 1,
      duration: 1,
      ease: "none" as const,
    };

    const imagePositions = [1.5, 6.5, 9.5];

    imageWrappers.forEach((wrapper, index) => {
      if (wrapper && imagePositions[index] !== undefined) {
        timeline.to(wrapper, imageConfig, imagePositions[index]);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        py-10
        md:py-20
        px-[20px]
        sm:px-[40px]
        md:px-[64px]
        lg:px-[96px]
        xl:px-[128px]
        2xl:px-[156px]
        flex flex-col items-center justify-center gap-10 md:gap-14"
    >
      <p
        ref={textRef}
        className="font-medium text-[40px] leading-[1.2] tracking-[-0.01em] md:tracking-normal md:text-[90px] md:leading-[1.6] text-center text-(--text-label) max-w-[1128px]"
      >
        <span className="word inline-block opacity-20">We</span>{" "}
        <span
          className={cn(
            playfairDisplay.className,
            "relative italic font-normal"
          )}
        >
          <span className="word inline-block opacity-20">
            believe
            <span className="hidden md:inline">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </span>
          <Image
            src="/images/beliefs-1.png"
            alt="Believe"
            width={146}
            height={95}
            className="animate-image hidden md:block absolute top-1/2 -translate-y-[40%] right-0 translate-x-[20px] opacity-20"
          />
        </span>{" "}
        <span className="word inline-block opacity-20">every</span>{" "}
        <span className={cn(playfairDisplay.className, "italic font-normal")}>
          <span className="word inline-block opacity-20">injured</span>
        </span>{" "}
        <span className="word inline-block opacity-20">person</span>{" "}
        <span className="word inline-block opacity-20">deserves</span>{" "}
        <span className="relative">
          <span className="word inline-block opacity-20">
            the
            <span className="hidden md:inline">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </span>
          <Image
            src="/images/beliefs-2.png"
            alt="Best Quality Representation"
            width={146}
            height={95}
            className="animate-image hidden md:block absolute top-1/2 -translate-y-[40%] right-0 translate-x-[-18px] opacity-20"
          />
        </span>
        <span className={cn(playfairDisplay.className, "italic font-normal")}>
          <span className="word inline-block opacity-20">best</span>{" "}
          <span className="word inline-block opacity-20">quality</span>{" "}
          <span className="relative">
            <span className="word inline-block opacity-20">
              representation
              <span className="hidden md:inline">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </span>
            <Image
              src="/images/beliefs-3.png"
              alt="Best Quality Representation"
              width={146}
              height={95}
              className="animate-image hidden md:block absolute top-1/2 -translate-y-[40%] right-0 translate-x-[18px] opacity-20"
            />
          </span>{" "}
          <span className="word inline-block opacity-20">&</span>{" "}
          <span className="word inline-block opacity-20">most</span>{" "}
          <span className="word inline-block opacity-20">money</span>{" "}
          <span className="word inline-block opacity-20">kept</span>
        </span>{" "}
        <span className="word inline-block opacity-20">in</span>{" "}
        <span className="word inline-block opacity-20">their</span>{" "}
        <span className="word inline-block opacity-20">hands.</span>
      </p>
      <p className="text-md md:text-2xl text-(--text-surface) text-center leading-[1.62] md:leading-normal max-w-[622px]">
        Our AI-powered system ensures you get world-class accuracy in your case
        while keeping legal costs the lowest in the industry.
      </p>
    </section>
  );
};
