"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {
  formattedTopics: { text: string; value: number }[];
};

const CustomWordCount = ({ formattedTopics }: Props) => {
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  const fontSizeMapper = (word: { value: number }) => {
    return Math.log2(word.value) * 5 + 10;
  };

  return (
    <D3WordCloud
      data={formattedTopics}
      height={550}
      font="Times"
      fontSize={fontSizeMapper}
      rotate={0}
      padding={10}
      fill={resolvedTheme === "dark" ? "white" : "black"}
      onWordClick={(e, d) => {
        router.push("/quiz?topic=" + d.text);
      }}
    />
  );
};

export default CustomWordCount;
