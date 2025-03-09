import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getTest } from "../api";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  padding: 30px 30px;

  overflow: hidden;
`;

const TestSheet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: #e9ebed;
  border-radius: 15px;
  width: 100%;

  padding: 30px;
`;

const Title = styled.div`
  font-size: 24px;
  width: 100%;
  text-align: center;
  font-weight: 600;
  margin-bottom: 15px;
`;

const QuestionWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Question = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const ChoiceWrapper = styled.div`
  margin: 10px 0px;
  padding: 0px 5px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const Choice = styled.button<{ isActive: boolean; isRight: string }>`
  border: 1px solid ${(props) => props.theme.color};

  background-color: ${(props) =>
    props.isActive ? `${props.theme.selectedColor}` : "whitesmoke"};
  background-color: ${(props) =>
    props.isActive || props.isRight === "wrong" ? "red" : "whitesmoke"};

  background-color: ${(props) =>
    props.isActive || props.isRight === "right" ? "green" : "whitesmoke"};

  border-radius: 5px;

  text-align: center;

  font-size: 14px;
  font-weight: 300;

  padding: 5px;
  margin: 0px 10px;

  cursor: pointer;

  &:hover {
    opacity: ${(props) => (props.isActive ? "1" : "0.8")};
  }

  word-wrap: break-word;

  transition: 0.1s ease-in-out;
`;
const ButtonWrapper = styled.div`
  margin-top: 20px;
  width: 40%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const SubmitButton = styled.button`
  padding: 10px;
  margin: 0px 10px;
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ResetButton = styled.button`
  padding: 10px;
  margin: 0px 10px;
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

function Test() {
  const { dayPk } = useParams();
  const { isLoading, data } = useQuery<ITest>({
    queryKey: [`test:${dayPk}`, dayPk],
    queryFn: getTest,
  });
  const [userSelected, setUserSelected] = useState<Record<number, number>>({});
  const elementsRefs = useRef<Record<number, HTMLButtonElement | null>>({});
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
  const onResetClicked = () => {
    setUserSelected({});
  };
  const onSubmit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    Object.entries(userSelected).forEach(([key, value]) => {
      const numberKey = parseInt(key, 10);
      if (numberKey === value) {
        //elementsRefs.current[numberKey]
        elementsRefs.current[numberKey]?.setAttribute("isRight", "right");
      } else if (numberKey !== value) {
        elementsRefs.current[value]?.setAttribute("isRight", "wrong");
      }
    });
  };

  return (
    <Wrapper>
      <TestSheet>
        <title>Test</title>
        <Title>Day {dayPk}</Title>
        {isLoading || !data ? (
          "Loading..."
        ) : (
          <>
            {data.question.map((problem, index) => (
              <QuestionWrapper key={problem.id}>
                <Question>
                  {index + 1}. {problem.answer.word}
                </Question>
                <ChoiceWrapper>
                  {problem.choice.map((word) => (
                    <Choice
                      key={word.id}
                      ref={(e1) => {
                        elementsRefs.current[word.id] = e1;
                      }}
                      onClick={() =>
                        onChoiceClicked(problem.answer.id, word.id)
                      }
                      isActive={
                        userSelected[problem.answer.id] === word.id
                          ? true
                          : false
                      }
                      isRight={"none"}
                    >
                      {word.definition}
                    </Choice>
                  ))}
                </ChoiceWrapper>
              </QuestionWrapper>
            ))}
            <ButtonWrapper>
              <SubmitButton onClick={onSubmit}>제출</SubmitButton>
              <ResetButton onClick={onResetClicked}>입력 초기화</ResetButton>
            </ButtonWrapper>
          </>
        )}
      </TestSheet>
    </Wrapper>
  );
}

export default Test;
