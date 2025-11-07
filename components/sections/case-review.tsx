"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { caseReviewFormSchema, type CaseReviewFormValues } from "@/lib/schemas";
import { US_STATES, CASE_TYPES } from "@/lib/data";
import { Clock, Headphones, CaseReviewSpotlight } from "../svgs";
import { playfairDisplay } from "@/app/fonts";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CaseReview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<CaseReviewFormValues>({
    resolver: zodResolver(caseReviewFormSchema),
    defaultValues: {
      consent: false,
      state: "",
      caseType: "",
    },
  });

  const consent = watch("consent");

  const onSubmit = (data: CaseReviewFormValues) => {
    console.log(data);
  };

  return (
    <section className="px-3">
      <div className="relative rounded-4xl py-20 px-16 bg-(--bg-black) grid grid-cols-2 gap-20 text-white overflow-hidden">
        <Image
          src="/images/noise.png"
          alt="Background"
          fill
          className="object-cover mix-blend-soft-light w-full pointer-events-none opacity-65"
        />
        <CaseReviewSpotlight className="absolute -top-[15%] left-[40%] -translate-x-1/2 pointer-events-none" />
        <div className="space-y-16 relative z-10">
          <div className="space-y-5">
            <p
              className={cn(
                playfairDisplay.className,
                "font-medium text-[52px] leading-[1.3]"
              )}
            >
              Free Case Review
            </p>
            <p className="text-lg leading-[1.6] text-(--text-white-alpha)">
              Get the best quality case assessment on the market—100% free. No
              risk, no obligation, and you&apos;ll instantly see how much more
              you can keep.
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex gap-3">
              <Headphones />
              <div className="space-y-2">
                <p className="font-medium text-2xl leading-[1.33]">
                  Real-time support
                </p>
                <p className="leading-[1.62] text-(--text-white-alpha)">
                  Talk to experts the moment you need help.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock />
              <div className="space-y-2">
                <p className="font-medium text-2xl leading-[1.33]">
                  24/7 call center
                </p>
                <p className="leading-[1.62] text-(--text-white-alpha)">
                  Around-the-clock help, whenever you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 bg-white/90 rounded-[20px] p-8 border border-(--stroke-soft) space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                {...register("phone")}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="state">State your incident Occurred*</Label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="state"
                      className={cn(
                        errors.state ? "border-destructive" : "",
                        "w-full"
                      )}
                    >
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.state && (
                <p className="text-sm text-destructive">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="caseType">Case Type</Label>
              <Controller
                name="caseType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="caseType"
                      className={cn(
                        errors.caseType ? "border-destructive" : "",
                        "w-full"
                      )}
                    >
                      <SelectValue placeholder="Select a case type" />
                    </SelectTrigger>
                    <SelectContent>
                      {CASE_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.caseType && (
                <p className="text-sm text-destructive">
                  {errors.caseType.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your situation."
              {...register("message")}
              className={cn(
                "min-h-[100px]",
                errors.message ? "border-destructive" : ""
              )}
            />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) =>
                setValue("consent", checked === true)
              }
              className={cn(
                errors.consent ? "border-destructive" : "",
                "mt-[2px]"
              )}
            />
            <Label
              htmlFor="consent"
              className="text-sm font-normal leading-[1.57] text-(--text-surface)"
            >
              I agree to receive automated communications, including calls,
              texts, and emails from Injuro.
            </Label>
          </div>
          {errors.consent && (
            <p className="text-sm text-destructive -mt-6">
              {errors.consent.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-[#1CC79E] hover:bg-[#1CC79E]/90 text-white"
          >
            Request a Call Back
          </Button>
        </form>
      </div>
    </section>
  );
};
