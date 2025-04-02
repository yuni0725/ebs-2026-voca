import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getAllTests } from "../api";
import { NoDecoLink } from "../components/LinkWithNoDeco";
import { useRecoilValue } from "recoil";
import { dayScoreState } from "../atom";
import { Button } from "@/components/ui/button";
import "../app.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Wrapper = styled.div`
  width: 100vw;
  padding: 0px 30px;
`;

interface IAllTests {
  day: number;
  created_at: string;
}

function Home() {
  const score = useRecoilValue(dayScoreState);
  const { isLoading, data } = useQuery<IAllTests[]>({
    queryKey: ["tests"],
    queryFn: getAllTests,
  });
  return (
    <Wrapper className="grid grid-cols-4 !pb-20">
      {isLoading ? (
        <>
          <Skeleton className="h-50 !min-w-150 !max-w-300 rounded-xl" />
          <Skeleton className="h-50 !min-w-150 !max-w-300 rounded-xl !mt-10" />
        </>
      ) : (
        data?.map((test) => (
          <Card key={test.day} className="!p-5 !m-2 !max-w-300 !min-w-20">
            <CardHeader>
              <CardTitle className="!text-xl !font-bold">
                {test.day}회차
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-5 flex-col">
              <p className="text-m">
                점수 :{" "}
                {score[test.day] || score[test.day] === 0
                  ? `${score[test.day]}/45`
                  : "0/45"}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between gap-3">
              <Button variant={"link"} className="!text-accent-foreground">
                <NoDecoLink to={`test/${test.day}`}>Link →</NoDecoLink>
              </Button>
              <p className="!text-xs">업데이트 날짜 : {test.created_at}</p>
            </CardFooter>
          </Card>
        ))
      )}
    </Wrapper>
  );
}

export default Home;
