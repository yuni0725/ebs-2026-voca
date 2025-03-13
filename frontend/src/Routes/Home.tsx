import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getAllTests } from "../api";
import { NoDecoLink } from "../components/LinkWithNoDeco";
import { useRecoilValue } from "recoil";
import { dayScoreState } from "../atom";

const Wrapper = styled.div`
  width: 100vw;
  padding: 0px 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  table-layout: auto;
`;

const Tr = styled.tr`
  &:nth-child(odd) td {
    background-color: ${(props) => props.theme.tableColor.tOddBgColor};
  }
`;

const Th = styled.th`
  background-color: ${(props) => props.theme.tableColor.tBgColor};
  color: ${(props) => props.theme.color};
  font-size: 16px;
  font-weight: 600;
  text-align: left;

  padding: 6px 15px;

  border-top: 1px solid ${(props) => props.theme.tableColor.borderColor};
  border-right: 1px solid ${(props) => props.theme.tableColor.borderColor};
  border-bottom: 1px solid ${(props) => props.theme.tableColor.borderColor};
  &:first-child {
    border-left: 1px solid ${(props) => props.theme.tableColor.borderColor};
  }
`;

const Td = styled.td`
  font-size: 16px;
  font-weight: 300;

  border-right: 1px solid ${(props) => props.theme.tableColor.borderColor};
  border-bottom: 1px solid ${(props) => props.theme.tableColor.borderColor};
  color: ${(props) => props.theme.color};

  padding: 6px 15px;

  background-color: ${(props) => props.theme.tableColor.tBgColor};

  &:first-child {
    border-left: 1px solid ${(props) => props.theme.tableColor.borderColor};
    padding-left: 20px;
  }
`;

const LinkWrapper = styled.div`
  color: ${(props) => props.theme.accentColor};
  font-weight: 600;

  &:hover {
    opacity: 0.8;
  }
  transition: 0.1s ease-in-out;
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
    <Wrapper>
      <Table>
        <thead>
          <Tr>
            <Th>회차</Th>
            <Th>점수</Th>
            <Th>업데이트 날짜</Th>
            <Th>바로가기</Th>
          </Tr>
        </thead>
        <tbody>
          {isLoading
            ? null
            : data?.map((test) => (
                <Tr key={test.day}>
                  <Td>{test.day}</Td>
                  <Td>
                    {score[test.day] || score[test.day] === 0
                      ? `${score[test.day]}/45`
                      : "-"}
                  </Td>
                  <Td>{test.created_at}</Td>
                  <Td>
                    <LinkWrapper>
                      <NoDecoLink to={`test/${test.day}`}>Link →</NoDecoLink>
                    </LinkWrapper>
                  </Td>
                </Tr>
              ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

export default Home;
