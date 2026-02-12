import { create } from 'zustand';

export type Screen = 'intro' | 'question' | 'loading' | 'result' | 'friend' | 'compatibility' | 'collection';

interface PotatoPower {
  바삭함: number;
  사교성: number;
  모험심: number;
  계획력: number;
}

interface AppState {
  // 화면 상태
  currentScreen: Screen;
  previousScreen: Screen | null;
  slideDirection: 'left' | 'right';

  // 테스트 상태
  currentQuestion: number;
  answers: Record<number, 'A' | 'B'>;
  startTime: number | null;
  questionStartTime: number | null;

  // 결과 상태
  resultType: string | null;
  scores: Record<string, number>;
  potatoPower: PotatoPower | null;

  // 친구 예측 상태
  friendName: string;
  friendAnswers: Record<number, 'A' | 'B'>;
  friendCurrentQuestion: number;
  friendResultType: string | null;

  // 궁합 상태
  compatType1: string;
  compatType2: string;

  // URL 파라미터
  source: string;
  ref: string;

  // 토스트
  toastMessage: string | null;

  // 액션
  setScreen: (screen: Screen) => void;
  startTest: () => void;
  answerQuestion: (questionNum: number, answer: 'A' | 'B') => void;
  goToPreviousQuestion: () => void;
  setResult: (typeCode: string, scores: Record<string, number>, potatoPower: PotatoPower) => void;
  resetTest: () => void;
  setSource: (source: string, ref: string) => void;
  showToast: (message: string) => void;
  hideToast: () => void;

  // 친구 예측 액션
  setFriendName: (name: string) => void;
  answerFriendQuestion: (questionNum: number, answer: 'A' | 'B') => void;
  setFriendResult: (typeCode: string) => void;
  resetFriend: () => void;

  // 궁합 액션
  setCompatTypes: (type1: string, type2: string) => void;
}

export const useStore = create<AppState>((set) => ({
  currentScreen: 'intro',
  previousScreen: null,
  slideDirection: 'left',

  currentQuestion: 1,
  answers: {},
  startTime: null,
  questionStartTime: null,

  resultType: null,
  scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
  potatoPower: null,

  friendName: '',
  friendAnswers: {},
  friendCurrentQuestion: 1,
  friendResultType: null,

  compatType1: '',
  compatType2: '',

  source: 'direct',
  ref: '',

  toastMessage: null,

  setScreen: (screen) =>
    set((state) => ({
      currentScreen: screen,
      previousScreen: state.currentScreen,
      slideDirection: 'left',
    })),

  startTest: () =>
    set({
      currentScreen: 'question',
      currentQuestion: 1,
      answers: {},
      startTime: Date.now(),
      questionStartTime: Date.now(),
      slideDirection: 'left',
    }),

  answerQuestion: (questionNum, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionNum]: answer },
      questionStartTime: Date.now(),
    })),

  goToPreviousQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(1, state.currentQuestion - 1),
      slideDirection: 'right',
    })),

  setResult: (typeCode, scores, potatoPower) =>
    set({
      resultType: typeCode,
      scores,
      potatoPower,
    }),

  resetTest: () =>
    set({
      currentScreen: 'intro',
      currentQuestion: 1,
      answers: {},
      startTime: null,
      questionStartTime: null,
      resultType: null,
      scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
      potatoPower: null,
      slideDirection: 'left',
    }),

  setSource: (source, ref) => set({ source, ref }),

  showToast: (message) => set({ toastMessage: message }),
  hideToast: () => set({ toastMessage: null }),

  setFriendName: (name) => set({ friendName: name }),
  answerFriendQuestion: (questionNum, answer) =>
    set((state) => ({
      friendAnswers: { ...state.friendAnswers, [questionNum]: answer },
    })),
  setFriendResult: (typeCode) => set({ friendResultType: typeCode }),
  resetFriend: () =>
    set({
      friendName: '',
      friendAnswers: {},
      friendCurrentQuestion: 1,
      friendResultType: null,
    }),

  setCompatTypes: (type1, type2) => set({ compatType1: type1, compatType2: type2 }),
}));
