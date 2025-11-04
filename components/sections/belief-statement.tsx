import { cn } from "@/lib/utils";
import { playfairDisplay } from "@/app/fonts";
import Image from "next/image";

export const BeliefStatement = () => {
  return (
    <section className="py-20 px-39 flex flex-col items-center justify-center gap-14">
      <p className="font-medium text-[90px] leading-[1.6] text-center text-(--text-label) max-w-[1128px]">
        We{" "}
        <span
          className={cn(
            playfairDisplay.className,
            "relative italic font-normal"
          )}
        >
          believe&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Image
            src="/images/beliefs-1.png"
            alt="Believe"
            width={146}
            height={95}
            className="absolute top-1/2 -translate-y-[40%] right-0 translate-x-[20px]"
          />
        </span>{" "}
        every{" "}
        <span className={cn(playfairDisplay.className, "italic font-normal")}>
          injured
        </span>{" "}
        person deserves{" "}
        <span className="relative">
          the &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Image
            src="/images/beliefs-2.png"
            alt="Best Quality Representation"
            width={146}
            height={95}
            className="absolute top-1/2 -translate-y-[40%] right-0 translate-x-[-18px]"
          />
        </span>
        <span className={cn(playfairDisplay.className, "italic font-normal")}>
          best quality{" "}
          <span className="relative">
            representation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Image
              src="/images/beliefs-3.png"
              alt="Best Quality Representation"
              width={146}
              height={95}
              className="absolute top-1/2 -translate-y-[40%] right-0 translate-x-[18px]"
            />
          </span>{" "}
          & most money kept
        </span>{" "}
        in their hands.
      </p>
      <p className="text-2xl text-(--text-surface) text-center leading-normal max-w-[622px]">
        Our AI-powered system ensures you get world-class accuracy in your case
        while keeping legal costs the lowest in the industry.
      </p>
    </section>
  );
};
