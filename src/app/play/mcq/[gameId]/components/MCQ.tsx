"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Game, Question } from "@prisma/client";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import MCQCounter from "./MCQCounter";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { checkAnswerType } from "@/types/questions";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { cn, formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [now, setNow] = useState<Date>(new Date());
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [hasEnded]);
  
  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];

    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerType> = {
        questionId: currentQuestion.id,
        userInput: options[selectedOption],
      };
      const response = await axios.post(`/api/checkAnswer`, payload);
      return response.data;
    },
  });

  const handleNext = useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          toast({
            title: "Correct!",
            description: "Correct answer",
            variant: "success",
          });
          setCorrectAnswers((prev) => prev + 1);
        } else {
          toast({
            title: "Incorrect!",
            description: "Incorrect answer",
            variant: "destructive",
          });
          setIncorrectAnswers((prev) => prev + 1);
        }

        setQuestionIndex((prev) => prev + 1);

        if (questionIndex === game.questions.length - 1) {
          setHasEnded(true);
        }
      },
    });
  }, [checkAnswer, toast, isChecking, game.questions.length , questionIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "1") {
        setSelectedOption(0);
      } else if (event.key === "2") {
        setSelectedOption(1);
      } else if (event.key === "3") {
        setSelectedOption(2);
      } else if (event.key === "4") {
        setSelectedOption(3);
      } else if (event.key === "Enter") {
        handleNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          You Completed in{" "}
          {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
        </div>
        <Link
          href={`/statistics/${game.id}`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          View Statistics
          <BarChart className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2 mt-12">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {/* topic */}
          <p>
            <span className="text-slate-400">Topic</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>

        <MCQCounter
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
        />
      </div>

      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion?.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => {
          return (
            <Button
              key={index}
              variant={selectedOption === index ? "default" : "secondary"}
              onClick={() => setSelectedOption(index)}
              className="justify-start w-full py-8 mb-4"
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button className="mt-2" disabled={isChecking} onClick={handleNext}>
          {isChecking && <Loader2 className="w-4 h-4 mr-2 animated-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
