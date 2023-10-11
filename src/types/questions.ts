import { z } from "zod";

export const getQuestionsType = z.object({
  topic: z.string(),
  amount: z.number().int().positive().min(1).max(10),
  type: z.enum(["mcq", "open_ended"]),
});

export const checkAnswerType = z.object({
  userInput: z.string(),
  questionId: z.string(),
});

export const endGameType = z.object({
  gameId: z.string(),
});