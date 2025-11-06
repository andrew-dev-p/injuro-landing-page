import Image from "next/image";
import { playfairDisplay } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { whyInjuroData } from "@/lib/data";
import { WhyInjuroSpotlight } from "../svgs/why-injuro-spotlight";

export const WhyInjuro = () => {
  return (
    <section className="container-md px-5 py-20 space-y-5 md:space-y-16">
      <h2
        className={cn(
          playfairDisplay.className,
          "text-[52px] leading-[1.23] tracking-[-0.01em] text-(--text-strong) text-center"
        )}
      >
        Why Injuro Outperforms{" "}
        <span className="italic heading-gradient-text">Everyone Else</span>
      </h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:max-w-[550px] space-y-6">
          <Image
            src="/images/why-injuro.png"
            alt="Why Injuro Outperforms Everyone Else"
            width={550}
            height={504}
            className="hidden lg:block"
          />
          <p className="text-lg leading-[1.67] text-(--text-surface) text-center lg:text-left">
            Justice means you deserve a fair piece of the pie. Injuro makes that
            happen.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {whyInjuroData.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={cn(
                  "p-8 rounded-[12px] bg-(--stroke-hunter-lighter) border border-(--stroke-hunter-light) h-full flex flex-col justify-between gap-3 md:gap-8",
                  item.id === "1" &&
                    "bg-(--bg-black) border-transparent relative overflow-hidden"
                )}
              >
                {item.id === "1" && (
                  <>
                    <Image
                      src="/images/noise.png"
                      alt="Background noise"
                      fill
                      className="object-cover mix-blend-soft-light w-full pointer-events-none"
                    />
                    <WhyInjuroSpotlight className="absolute top-[80%] left-[70%] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                  </>
                )}
                <div
                  className={cn(
                    "space-y-5",
                    item.id === "1" && "relative z-10"
                  )}
                >
                  <div
                    className={cn(
                      "w-14 aspect-square rounded-full p-1 border border-(--stroke-hunter-light) scale-[0.7] md:scale-100 -translate-x-[10px] -translate-y-[10px]",
                      item.id === "1" &&
                        "border-(--stroke-white-alpha) bg-(--bg-hunter-light)"
                    )}
                  >
                    <div className="flex items-center justify-center w-full h-full bg-white rounded-full">
                      <IconComponent />
                    </div>
                  </div>
                  <p
                    className={cn(
                      "text-base md:text-2xl leading-[1.33] font-medium text-(--text-strong)",
                      item.id === "1" && "text-white"
                    )}
                  >
                    {item.title}
                  </p>
                </div>
                <p
                  className={cn(
                    "text-sm md:text-base leading-[1.62] text-(--text-surface)",
                    item.id === "1" && "text-(--text-white-alpha) relative z-10"
                  )}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
