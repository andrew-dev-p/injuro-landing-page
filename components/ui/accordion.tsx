"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PlusMinusIcon } from "@/components/svgs";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const observer = new MutationObserver(() => {
      setIsOpen(item.getAttribute("data-state") === "open");
    });

    observer.observe(item, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    // Initial check
    setIsOpen(item.getAttribute("data-state") === "open");

    return () => observer.disconnect();
  }, []);

  return (
    <AccordionPrimitive.Item
      ref={itemRef}
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    >
      <div
        className={cn(
          "border rounded-2xl transition-all duration-300",
          isOpen
            ? "border-transparent bg-linear-to-r from-[#1EB792] to-[#0198CC] p-[0.5px]"
            : "border-(--stroke-surface)"
        )}
      >
        <motion.div
          className={cn("rounded-[15.5px]")}
          animate={{
            backgroundColor: isOpen ? "#ffffff" : "transparent",
            margin: isOpen ? "-0.25px" : "0px",
            width: isOpen ? "calc(100% + 0.75px)" : "100%",
            height: isOpen ? "calc(100% + 0.5px)" : "100%",
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      </div>
    </AccordionPrimitive.Item>
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new MutationObserver(() => {
      setIsOpen(trigger.getAttribute("data-state") === "open");
    });

    observer.observe(trigger, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    // Initial check
    setIsOpen(trigger.getAttribute("data-state") === "open");

    return () => observer.disconnect();
  }, []);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={triggerRef}
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
          !isOpen && "hover:underline cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
        <PlusMinusIcon
          isOpen={isOpen}
          className="pointer-events-none shrink-0"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
