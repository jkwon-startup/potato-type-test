export interface Question {
  id: number;
  text: string;
  optionA: { text: string; emoji: string };
  optionB: { text: string; emoji: string };
  axis: 'EI' | 'SN' | 'TF' | 'JP';
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '감자튀김 먹을 때 선호하는 상황은?',
    optionA: { text: '친구들이랑 왁자지껄 나눠먹기', emoji: '🎉' },
    optionB: { text: '혼자 조용히 음미하며 먹기', emoji: '😌' },
    axis: 'EI',
  },
  {
    id: 2,
    text: 'SNS에 감자튀김 사진 올린다면?',
    optionA: { text: '바로 찍어서 스토리 공유', emoji: '📸' },
    optionB: { text: '맛있으면 마음속으로 간직', emoji: '🤫' },
    axis: 'EI',
  },
  {
    id: 3,
    text: '새로운 감자 메뉴가 나왔다!',
    optionA: { text: '일단 먹어본 거 시킴 (검증된 맛)', emoji: '👍' },
    optionB: { text: '무조건 신메뉴 도전 (궁금해!)', emoji: '✨' },
    axis: 'SN',
  },
  {
    id: 4,
    text: '감자튀김을 먹으며 드는 생각은?',
    optionA: { text: '"바삭하고 짭짤해서 맛있다"', emoji: '😋' },
    optionB: { text: '"이 감자는 어디서 왔을까..."', emoji: '🤔' },
    axis: 'SN',
  },
  {
    id: 5,
    text: '친구가 "나 다이어트 중인데 감자 먹어도 될까?" 하면?',
    optionA: { text: '"한 번쯤은 괜찮지 않을까?"', emoji: '😊' },
    optionB: { text: '"탄수화물이니까 적당히 먹어"', emoji: '🧐' },
    axis: 'TF',
  },
  {
    id: 6,
    text: '감자튀김 양이 생각보다 적게 나왔다!',
    optionA: { text: '직원에게 정중히 확인해본다', emoji: '🙋' },
    optionB: { text: '"그럴 수도 있지" 하고 넘어간다', emoji: '😅' },
    axis: 'TF',
  },
  {
    id: 7,
    text: '감자산 원정대에 참여하게 된 계기는?',
    optionA: { text: '재밌어 보여서 즉흥 참여!', emoji: '🎲' },
    optionB: { text: '미리 일정 확인하고 계획해서', emoji: '📋' },
    axis: 'JP',
  },
  {
    id: 8,
    text: '감자튀김 다 먹고 난 후에는?',
    optionA: { text: '분위기 봐서 다음 행선지 정함', emoji: '🌈' },
    optionB: { text: '이미 다음 코스 생각해둠', emoji: '🗺️' },
    axis: 'JP',
  },
];

// 점수 매핑: 각 질문의 A/B 선택에 따라 어떤 축에 점수를 줄지
export const SCORE_MAP: Record<number, { A: Record<string, number>; B: Record<string, number> }> = {
  1: { A: { E: 1 }, B: { I: 1 } },
  2: { A: { E: 1 }, B: { I: 1 } },
  3: { A: { S: 1 }, B: { N: 1 } },
  4: { A: { S: 1 }, B: { N: 1 } },
  5: { A: { F: 1 }, B: { T: 1 } },
  6: { A: { T: 1 }, B: { F: 1 } },
  7: { A: { P: 1 }, B: { J: 1 } },
  8: { A: { P: 1 }, B: { J: 1 } },
};
