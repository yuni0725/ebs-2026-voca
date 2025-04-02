import styled from "styled-components";
import { FaAlignJustify, FaHouse } from "react-icons/fa6";
import { NoDecoLink } from "./LinkWithNoDeco";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const Wrapper = styled.div`
  width: 100vw;
  height: 10vh;

  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  font-weight: 600;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
`;

function Header() {
  return (
    <Wrapper>
      <IconWrapper>
        <NoDecoLink to="/">
          <FaHouse></FaHouse>
        </NoDecoLink>
      </IconWrapper>
      <HoverCard>
        <HoverCardTrigger className="flex justify-center items-center">
          <Title>2026 EBS English Voca Test</Title>
        </HoverCardTrigger>
        <HoverCardContent className="!p-10 text-center">
          <span className="text-xs text-center">
            개발자에게 문의하기 {"\n"} yuni0725.kwon@gmail.com
          </span>
        </HoverCardContent>
      </HoverCard>
      <IconWrapper>
        <FaAlignJustify />
      </IconWrapper>
    </Wrapper>
  );
}

export default Header;
