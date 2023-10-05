import React from "react";
import QuizMeCard from "./components/QuizMeCard";
import HistoryCard from "./components/HistoryCard";
import HotTopicCard from "./components/HotTopicCard";
import RecentActivities from "./components/RecentActivities";

type Props = {};

export const metadata = {
  title: "Dashboard / AI Quiz App",
  description: "Dashboard",
};

const Dashboard = (props: Props) => {
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicCard />
        <RecentActivities />
      </div>
    </main>
  );
};

export default Dashboard;
