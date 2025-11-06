import { cn } from "@/lib/utils";
import { playfairDisplay } from "@/app/fonts";
import { CaseTypesCarousel } from "@/components/ui/case-types-carousel";
import { caseTypesData } from "@/lib/data";

export const CaseTypes = () => {
  return (
    <section className="bg-(--bg-blue-soft) py-16 px-5 md:py-20 md:px-16">
      <div className="container-md space-y-10 md:space-y-16">
        <div className="flex justify-between flex-wrap gap-5 md:gap-10">
          <h2
            className={cn(
              playfairDisplay.className,
              "max-w-[456px] text-[40px] md:text-[52px] leading-[1.2] md:leading-[1.23] tracking-[-0.01em] text-(--text-strong)"
            )}
          >
            Represent Yourself,{" "}
            <span className="italic heading-gradient-text">Win More</span>
          </h2>
          <p className="max-w-[586px] text-base md:text-lg leading-[1.62] md:leading-[1.67] text-(--text-surface)">
            Explore the types of personal injury cases you can handle directly
            with Injuro. By representing yourself, you keep control of your case
            and take home up to double the cash compared to traditional legal
            fees.
          </p>
        </div>
        <CaseTypesCarousel items={caseTypesData} />
      </div>
    </section>
  );
};
