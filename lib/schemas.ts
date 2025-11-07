import * as z from "zod";

const US_PHONE_REGEX =
  /^(\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const caseReviewFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required").regex(US_PHONE_REGEX, {
    message: "Invalid phone number. Example: (555) 123-4567 or 555-123-4567",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  state: z.string().min(1, "State is required"),
  caseType: z.string().min(1, "Case type is required"),
  message: z.string().min(1, "Message is required"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive communications",
  }),
});

export type CaseReviewFormValues = z.infer<typeof caseReviewFormSchema>;
