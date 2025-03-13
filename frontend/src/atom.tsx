import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IDayScoreState {
  [day: string]: number;
}

const { persistAtom } = recoilPersist();

export const dayScoreState = atom<IDayScoreState>({
  key: "score",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export interface IDayTestResult {
  [day: string]: Record<number, number>;
}

export const dayTestResult = atom<IDayTestResult>({
  key: "dayTestResult",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
