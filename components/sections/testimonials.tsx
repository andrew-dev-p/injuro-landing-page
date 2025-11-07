import { cn } from "@/lib/utils";
import { playfairDisplay } from "@/app/fonts";
import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { testimonialsData } from "@/lib/data";

export const Testimonials = () => {
  return (
    <section className="bg-(--bg-tosca-soft)">
      <div className="container-md px-5 pt-20 pb-40 flex justify-between">
        <p
          className={cn(
            playfairDisplay.className,
            "max-w-[456px] text-[52px] leading-[1.23] tracking-[-0.01em] text-(--text-strong)"
          )}
        >
          What <span className="italic heading-gradient-text">People</span> Are
          Saying
        </p>

        <TestimonialsCarousel items={testimonialsData} />
      </div>
    </section>
  );
};
