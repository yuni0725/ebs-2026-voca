import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./Routes/Home";
import Test from "./Routes/Test";
import Error from "./Routes/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
      { path: "", element: <Home></Home> },
      { path: "/test/:dayPk", element: <Test></Test> },
    ],
  },
]);
