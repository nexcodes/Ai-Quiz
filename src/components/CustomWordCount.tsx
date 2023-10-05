"use client";

import { useTheme } from "next-themes";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {};

const CustomWordCount = (props: Props) => {
  const { theme } = useTheme();

    const data = [
        {
            text: "Hey",
            value: 3,
        },
    ]

    const fontSizeMapper = (word: {value: number}) => {
        return Math.log2(word.value) * 5 + 10
    }

  return (
    <D3WordCloud
      data={data}
      height={550}
      font="Times"
      fontSize={fontSizeMapper}
      rotate={0}
      padding={10}
      fill={theme === "dark" ? "white" : "black"}
    />
  );
};

export default CustomWordCount;
