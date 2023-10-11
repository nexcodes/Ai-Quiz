import React from "react";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import OpenEnded from "./components/OpenEnded";

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

const OpenEndedPage = async ({ params: { gameId } }: Props) => {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
        },
      },
    },
  });

  if (!game || game.gameType !== "open_ended") {
    return redirect("/quiz");
  }

  return <OpenEnded game={game} />;
};

export default OpenEndedPage;
