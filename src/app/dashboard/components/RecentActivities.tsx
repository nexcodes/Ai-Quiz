import HistoryComponent from "@/app/history/components/HistoryComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import Link from "next/link";
import React from "react";

type Props = {};

const RecentActivities = async (props: Props) => {

  const session = await getAuthSession()
  if(!session) return;


  const gameCount = prisma.game.count({
    where: {
      userId: session.user.id
    }
  })
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription>
          You have played a total of {gameCount} quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-y-scroll custom-scrollbar">
        <HistoryComponent limit={10} userId={session.user.id} />
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
