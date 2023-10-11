import React, { useMemo } from "react";
import keyword_extractor from "keyword-extractor";

type Props = {
  answer: string;
  setBlankAnswer: React.Dispatch<React.SetStateAction<string>>;
};

const BlankAnswerInput = ({ answer , setBlankAnswer }: Props) => {
  const BLANKS = "_____";

  const keywords = useMemo(() => {
    const words = keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    const shuffled = words.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }, [answer]);

  const answerWithBlanks = useMemo(() => {
    const answerWithBlanks = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, BLANKS);
    }, answer);

    setBlankAnswer(answerWithBlanks)

    return answerWithBlanks;
  }, [keywords, answer , setBlankAnswer]);

  return (
    <div className="flex justify-start w-full mt-4">
      <h1 className="text-xl font-semibold">
        {answerWithBlanks && answerWithBlanks.split(BLANKS).map((word, index) => {
          return (
            <>
              {word}
              {index !== answerWithBlanks.split(BLANKS).length - 1 && (
                <input
                  id="user-blank-input"
                  className="text-center border-b border-black dark:border-white w-29 focus:border-b-4 focus:outline-none"
                  autoComplete="off"
                />
              )}
            </>
          );
        })}
      </h1>
    </div>
  );
};

export default BlankAnswerInput;
