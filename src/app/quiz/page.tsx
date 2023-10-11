import React from "react";
import QuizCreation from "./components/QuizCreation";

type Props = {
  searchParams: {
    topic?: string;
  };
};

const metadata = {
  title: "Quiz / AI Quiz App",
  description: "Quiz",
};

const Quiz = ({ searchParams: { topic } }: Props) => {
  return <QuizCreation topicParam={topic ?? ""} />;
};

export default Quiz;
