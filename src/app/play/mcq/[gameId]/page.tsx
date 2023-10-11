import React from "react";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import MCQ from "./components/MCQ";

type Props = {
  params: {
    gameId: string;
  };
};

export async function generateMetadata({ params: { gameId } }: Props) {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });

  return {
    title: `${game?.topic} / AI Quiz Application`,
  };
}

const MCQPage = async ({ params: { gameId } }: Props) => {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });

  if (!game || game.gameType !== "mcq") {
    return redirect("/quiz");
  }

  return <MCQ game={game} />;
};

export default MCQPage;
