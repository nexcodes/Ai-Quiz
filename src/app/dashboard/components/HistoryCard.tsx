"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const HistoryCard = (props: Props) => {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer hover:opacity-75"
      onClick={() => router.push("/history")}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">History</CardTitle>
        <History size={20} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {"View your past quiz results and see how you've improved!"}
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
