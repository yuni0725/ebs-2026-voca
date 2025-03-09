import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { LightTheme } from "./theme";
import { router } from "./Router";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
    box-sizing : border-box;
  }

  body {
    font-family : 'Roboto', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height : 1.2;
    font-weight : 300;
    color: ${(props) => props.theme.color}
  }

  body::-webkit-scrollbar {
    display : none;
  }
`;
const client = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={LightTheme}>
          <GlobalStyle></GlobalStyle>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
