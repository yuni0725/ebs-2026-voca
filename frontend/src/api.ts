import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export const getAllTests = () =>
  instance.get("test").then((response) => response.data);

export const getTest = ({ queryKey }: QueryFunctionContext) => {
  const [_, dayPk] = queryKey;
  return instance.get(`test/${dayPk}`).then((response) => response.data);
};
