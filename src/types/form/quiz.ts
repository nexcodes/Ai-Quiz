import { z } from "zod";

export const quizCreationType = z.object({
  topic: z
    .string()
    .min(4, { message: "Topic must be at least 4 characters long" })
    .max(50, { message: "Topic must be below 50 characters" }),
  type: z.enum(["mcq", "open_ended"]),
  amount: z.number().min(1).max(10),
});
