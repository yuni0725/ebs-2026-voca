import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Layout() {
  return (
    <Wrapper className="!px-5 md:!px-15 xl:!px-30">
      <Header></Header>
      <Outlet></Outlet>
    </Wrapper>
  );
}

export default Layout;
