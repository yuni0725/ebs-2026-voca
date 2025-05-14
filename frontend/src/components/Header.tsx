import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 10vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  font-weight: 600;
`;

function Header() {
  return (
    <Wrapper>
      <Link to="/">
        <Title>2026 EBS English Voca Test</Title>
      </Link>
    </Wrapper>
  );
}

export default Header;
