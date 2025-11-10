import { playfairDisplay } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { faqData } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const FAQ = () => {
  return (
    <section className="bg-(--bg-tosca-soft)">
      <div className="container-md px-5 pb-20 flex justify-between flex-col lg:flex-row gap-16 lg:gap-0">
        <div className="space-y-8">
          <p
            className={cn(
              playfairDisplay.className,
              "max-w-[500px] text-[40px] md:text-[52px] leading-[1.2] md:leading-[1.23] tracking-[-0.01em] text-(--text-strong)"
            )}
          >
            Got any questions?{" "}
            <span className="heading-gradient-text">
              We&apos;ve Got Straight Answers
            </span>
          </p>
          <Button className="bg-(--bg-black) hover:bg-(--bg-black)/90 shadow-[0_0_0_1px_var(--bg-black)] p-3 rounded-[10px] font-medium leading-normal">
            Contact Us
          </Button>
        </div>
        <Accordion
          type="single"
          defaultValue="1"
          className="w-full lg:w-[624px]"
        >
          {faqData.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="not-first:mt-5 border-b-0 last:border-b-0"
            >
              <div className="p-6">
                <AccordionTrigger className="p-0">
                  <p className="text-lg md:text-2xl font-medium leading-[1.33] text-(--text-strong)">
                    {item.question}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <p className="text-base md:text-lg leading-[1.62] md:leading-[1.67] text-(--text-surface) mt-5">
                    {item.answer}
                  </p>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
