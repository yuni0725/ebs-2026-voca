import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getTest } from "../api";
import React, { memo, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  dayScoreState,
  dayTestResult,
  IDayScoreState,
  IDayTestResult,
} from "../atom";

const Score = styled.div`
  width: 100%;
  font-size: 16px;
  margin: 10px 0px;
  text-align: center;
`;

const TestSheet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: #e9ebed;
  border-radius: 15px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 24px;
  width: 100%;
  text-align: center;
  font-weight: 600;
  margin-bottom: 15px;
`;

interface IChoice {
  active: string;
  right: string;
  key: number;
  word: string;
}

const ChoiceButton = styled.button<{
  selected: string;
  right: string;
  disable?: boolean;
}>`
  border: 1px solid ${(props) => props.theme.color};

  background-color: ${(props) => {
    if (props.right === ButtonStatus.right) {
      return "#2ecc71";
    }
    if (props.right === ButtonStatus.wrong) {
      return "#e74c3c";
    }
    if (
      props.selected === EUserSelected.selected &&
      props.right === ButtonStatus.stay
    ) {
      return props.theme.selectedColor;
    } else {
      return "whitesmoke";
    }
  }};
  border-radius: 5px;

  text-align: center;

  font-size: 14px;
  font-weight: 300;

  padding: 5px;

  cursor: pointer;

  &:hover {
    opacity: ${(props) =>
      props.selected === EUserSelected.selected ||
      props.right !== ButtonStatus.stay
        ? "1"
        : "0.8"};
  }
  opacity: 1;
  pointer-events: ${(props) => (props.disable ? "none" : "auto")};

  word-wrap: break-word;

  transition: 0.1s ease-in-out;
`;

const MemoButton = memo(
  ({
    onClick,
    selected,
    right,
    children,
    disable,
  }: {
    disable: boolean;
    onClick: () => void;
    selected: string;
    right: ButtonStatus;
    children: React.ReactNode;
  }) => {
    return (
      <ChoiceButton
        disable={disable}
        onClick={onClick}
        selected={selected}
        right={right}
        className="!p-1 !md:p-3 !flex-1"
      >
        {children}
      </ChoiceButton>
    );
  }
);

const QuestionWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Question = styled.div`
  font-weight: 500;
`;

const SubmitButton = styled.button`
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ResetButton = styled.button`
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  transition: 0.1s ease-in-out;
`;

interface IChoice {
  id: number;
  word: string;
  type: string;
  definition: string;
}

interface IQuestion {
  id: number;
  answer: IChoice;
  choice: IChoice[];
}

interface ITest {
  day: number;
  question: IQuestion[];
  created_at: string;
}

enum ButtonStatus {
  stay = "stay",
  right = "right",
  wrong = "wrong",
}

enum EUserSelected {
  selected = "selected",
  notSelected = "notSelected",
}

function Test() {
  const { dayPk } = useParams();
  const { isLoading, data } = useQuery<ITest>({
    queryKey: [`test:${dayPk}`, dayPk],
    queryFn: getTest,
  });
  const [score, setScore] = useRecoilState<IDayScoreState>(dayScoreState);
  const [submit, setSubmit] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<Record<number, number>>({});
  const [recoilUserSelected, setRecoilUserSelected] =
    useRecoilState<IDayTestResult>(dayTestResult);
  const onChoiceClicked = (answerId: number, choiceId: number) => {
    setUserSelected((prev) => {
      const newAnswers = { ...prev };
      if (prev[answerId] === choiceId) {
        delete newAnswers[answerId];
      } else {
        newAnswers[answerId] = choiceId;
      }

      return newAnswers;
    });
  };

  const checkButtonStatus = (
    answerId: number,
    choiceId: number
  ): ButtonStatus => {
    if (submit && userSelected) {
      if (answerId === choiceId) {
        return ButtonStatus.right;
      } else if (userSelected[answerId] === choiceId) {
        return ButtonStatus.wrong;
      }
    }
    return ButtonStatus.stay;
  };

  const onResetClicked = () => {
    setSubmit(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setUserSelected({});

    setRecoilUserSelected((prev) => {
      if (dayPk) {
        const newPrev = { ...prev };
        delete newPrev[parseInt(dayPk)];
        return newPrev;
      }
      return prev;
    });
    setScore((prev) => {
      const newScore = { ...prev };
      if (dayPk) {
        delete newScore[parseInt(dayPk)];
      }
      return newScore;
    });
  };

  const onSubmit = () => {
    setSubmit(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!dayPk) return;
    if (recoilUserSelected[dayPk]) {
      setUserSelected(recoilUserSelected[dayPk]);
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  });

  useEffect(() => {
    if (!submit || !userSelected) return;
    let newScore = 0;
    Object.entries(userSelected).forEach(([answerId, selectedId]) => {
      if (parseInt(answerId, 10) === selectedId) {
        newScore++;
      }

      setScore((prev: any) => {
        if (!dayPk) return;
        const copy = { ...prev };
        copy[dayPk] = newScore;
        return copy;
      });
    });
    if (dayPk) {
      setRecoilUserSelected((prev) => {
        const newUserSelected = { ...prev };
        newUserSelected[dayPk] = userSelected;
        return newUserSelected;
      });
    }
  }, [submit]);

  return (
    <div className="p-5 md:p-15">
      <TestSheet className="!p-5 !md:p-15">
        <title>Test</title>
        <Title>Day {dayPk}</Title>
        {isLoading || !data ? (
          "Loading..."
        ) : (
          <>
            {submit ? <Score>{dayPk ? score[dayPk] : 0} / 45</Score> : null}
            {data.question.map((problem, index) => (
              <QuestionWrapper key={index}>
                <Question className="!mb-2 !text-xl">
                  {index + 1}.{" "}
                  {index > 22 ? problem.answer.definition : problem.answer.word}
                </Question>
                <div
                  key={problem.id}
                  className="flex items-stretch justify-start flex-wrap gap-1 md:gap-2 md:grid md:grid-cols-5"
                >
                  {problem.choice.map((word) => (
                    <MemoButton
                      disable={submit ? true : false}
                      key={word.id}
                      onClick={() =>
                        onChoiceClicked(problem.answer.id, word.id)
                      }
                      right={checkButtonStatus(problem.answer.id, word.id)}
                      selected={
                        userSelected
                          ? userSelected[problem.answer.id] === word.id
                            ? EUserSelected.selected
                            : EUserSelected.notSelected
                          : EUserSelected.notSelected
                      }
                    >
                      {index > 22 ? word.word : word.definition}
                    </MemoButton>
                  ))}
                </div>
              </QuestionWrapper>
            ))}
          </>
        )}
        <div className="flex justify-center gap-2 !mt-10 h-10">
          <SubmitButton className="p-5 w-full h-full" onClick={onSubmit}>
            제출
          </SubmitButton>
          <ResetButton className="p-5 w-full h-full" onClick={onResetClicked}>
            입력 초기화
          </ResetButton>
        </div>
      </TestSheet>
    </div>
  );
}

export default Test;
