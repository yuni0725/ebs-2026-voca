import React from "react";
import styled from "styled-components";

enum ButtonStatus {
  stay = "stay",
  right = "right",
  wrong = "wrong",
}

interface IChoice {
  active: string;
  right: string;
  key: number;
  word: string;
}

enum EUserSelected {
  selected = "selected",
  notSelected = "notSelected",
}

const ChoiceButton = styled.button<{ selected: string; right: string }>`
  border: 1px solid ${(props) => props.theme.color};

  background-color: ${(props) => {
    if (
      props.selected === EUserSelected.selected &&
      props.right === ButtonStatus.stay
    ) {
      console.log("aslkdj");
      return props.theme.selectedColor;
    } else if (props.right === ButtonStatus.right) {
      return "green";
    } else if (props.right === ButtonStatus.wrong) {
      console.log("redred");
      return "red";
    } else {
      console.log("whitesmoke");
      return "whitesmoke";
    }
  }};
  border-radius: 5px;

  text-align: center;

  font-size: 14px;
  font-weight: 300;

  padding: 5px;
  margin: 0px 10px;

  cursor: pointer;

  &:hover {
    opacity: ${(props) =>
      props.selected === EUserSelected.selected ? "1" : "0.8"};
  }

  word-wrap: break-word;

  transition: 0.1s ease-in-out;
`;

function ChoiceComponent({
  word,
  selected,
  right,
  onClick,
}: {
  word: any;
  selected: string;
  right: string;
  onClick: () => void;
}) {
  return (
    <ChoiceButton onClick={onClick} selected={selected} right={right}>
      {word.definition}
    </ChoiceButton>
  );
}

export default React.memo(ChoiceComponent);
