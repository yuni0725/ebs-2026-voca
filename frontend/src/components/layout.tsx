import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Layout() {
  return (
    <Wrapper>
      <Header></Header>
      <Outlet></Outlet>
    </Wrapper>
  );
}

export default Layout;
