// api.ts
import { createClient } from "@supabase/supabase-js";

// 🔑 Supabase 초기화
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

//
// 🔷 타입 정의
//

export interface Test {
  id: number;
  day: number;
  created_at: string;
}

export interface Question {
  id: number;
  day: number;
  answer_id: number;
}

export interface QuestionChoice {
  question_id: number;
  meaning_id: number;
}

export interface Meaning {
  id: number;
  voca_id: number;
  type: "adj" | "verb" | "noun" | "adv" | "prep";
  definition: string;
}

export interface Voca {
  id: number;
  word: string;
}

// ✅ API 응답 형식
export interface TestResponse {
  day: number;
  created_at: string;
  question: QuestionResponse[];
}

export interface QuestionResponse {
  id: number;
  answer: MeaningWithWord;
  choice: MeaningWithWord[];
}

export interface MeaningWithWord {
  id: number;
  word: string;
  type: "adj" | "verb" | "noun" | "adv" | "prep";
  definition: string;
}

//
// 🔷 API 함수들
//

// ✅ 1. 전체 테스트 목록 조회 (day, created_at만 반환)
export const getAllTests = async (): Promise<
  Pick<Test, "day" | "created_at">[]
> => {
  const { data, error } = await supabase
    .from("test")
    .select("day, created_at")
    .order("day", { ascending: true });

  if (error || !data) throw error || new Error("Failed to fetch tests");
  return data;
};

// ✅ 2. 특정 test(day)에 해당하는 질문 목록 응답 (Django DRF 구조로)
export const getTest = async (day: number): Promise<TestResponse> => {
  const { data: testRow, error: testErr } = await supabase
    .from("test")
    .select("id, created_at")
    .eq("day", day)
    .single<Test>();
  if (testErr || !testRow) throw testErr || new Error("Test not found");

  const testId = testRow.id;

  const { data: tqLinks } = await supabase
    .from("test_question")
    .select("question_id")
    .eq("test_id", testId)
    .order("question_order", { ascending: true });
  const questionIds = (tqLinks ?? []).map((link: any) => link.question_id);

  const { data: questions } = await supabase
    .from("question")
    .select("id, answer_id")
    .in("id", questionIds);

  const { data: qcLinks } = await supabase
    .from("question_choice")
    .select("question_id, meaning_id")
    .in("question_id", questionIds)
    .order("choice_order", { ascending: true });

  const allMeaningIds = new Set<number>([
    ...questions!.map((q: any) => q.answer_id),
    ...(qcLinks ?? []).map((c: any) => c.meaning_id),
  ]);
  const allMeaningIdArray = Array.from(allMeaningIds);

  const { data: meanings } = await supabase
    .from("meaning")
    .select("id, voca_id, type, definition")
    .in("id", allMeaningIdArray);

  const vocaIds = Array.from(new Set(meanings!.map((m: any) => m.voca_id)));
  const { data: vocas } = await supabase
    .from("voca")
    .select("id, word")
    .in("id", vocaIds);

  const vocaMap: Record<number, string> = Object.fromEntries(
    vocas!.map((v: any) => [v.id, v.word])
  );

  const meaningMap: Record<number, MeaningWithWord> = Object.fromEntries(
    meanings!.map((m: any) => [
      m.id,
      {
        id: m.id,
        word: vocaMap[m.voca_id],
        type: m.type,
        definition: m.definition,
      },
    ])
  );

  const choiceMap: Record<number, number[]> = {};
  (qcLinks ?? []).forEach((link: any) => {
    if (!choiceMap[link.question_id]) choiceMap[link.question_id] = [];
    choiceMap[link.question_id].push(link.meaning_id);
  });

  const resultQuestions: QuestionResponse[] = questions!.map((q: any) => ({
    id: q.id,
    answer: meaningMap[q.answer_id],
    choice: (choiceMap[q.id] ?? []).map((mid) => meaningMap[mid]),
  }));

  return {
    day,
    created_at: testRow.created_at,
    question: resultQuestions,
  };
};
