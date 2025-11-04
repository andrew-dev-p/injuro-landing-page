import { cn } from "@/lib/utils";
import { playfairDisplay } from "@/app/fonts";
import { provenResultsStats } from "@/lib/data";
import Image from "next/image";
import { ProvenResultsSpotlight } from "../svgs/proven-results-spotlight";
import { CountUp } from "../common/count-up";

export const ProvenResults = () => {
  return (
    <section>
      <div className="relative mx-3 rounded-4xl py-20 px-16 bg-(--bg-black) space-y-[200px] overflow-hidden">
        <Image
          src="/images/noise.png"
          alt="Background"
          fill
          className="object-cover mix-blend-soft-light w-full"
        />
        <div className="absolute top-1/2 left-[17.5%] -translate-y-1/2 w-full h-full z-10">
          <ProvenResultsSpotlight />
        </div>
        <div className="space-y-6 relative z-10">
          <p
            className={cn(
              playfairDisplay.className,
              "text-[52px] leading-[1.23] tracking-[-0.01em] text-white"
            )}
          >
            Backed by{" "}
            <span className="italic gradient-text-proven">Proven Results</span>
          </p>
          <p className="text-lg leading-[1.67] text-(--text-white-alpha) max-w-[775px]">
            Injuro is supported by personal injury lawyers with decades of
            experience and{" "}
            <span className="font-medium leading-[1.33] text-white">
              hundreds of millions won
            </span>{" "}
            for clients.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-10 relative z-10">
          {provenResultsStats.map((stat, index) => (
            <div key={index} className="space-y-5">
              <p className="font-medium text-7xl leading-[1.31] text-white">
                {stat.prefix}
                <CountUp
                  to={stat.value}
                  from={0}
                  duration={2}
                  delay={index * 0.2}
                  className="inline"
                />
                {stat.suffix}
              </p>
              <div className="h-px bg-(--stroke-white-alpha)" />
              <div className="">
                <p className="text-white text-2xl leading-[1.33]">
                  {stat.title}
                </p>
                <p className="text-(--text-white-alpha) leading-[1.62]">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
