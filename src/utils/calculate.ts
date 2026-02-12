import { SCORE_MAP } from '../data/questions';
import { FRIEND_SCORE_MAP } from '../data/types';

export interface CalculationResult {
  typeCode: string;
  scores: Record<string, number>;
  potatoPower: {
    바삭함: number;
    사교성: number;
    모험심: number;
    계획력: number;
  };
}

export function calculateType(answers: Record<number, 'A' | 'B'>): CalculationResult {
  const scores: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (let q = 1; q <= 8; q++) {
    const answer = answers[q];
    if (!answer) continue;
    const mapping = SCORE_MAP[q][answer];
    Object.entries(mapping).forEach(([key, value]) => {
      scores[key] += value;
    });
  }

  const typeCode = [
    scores.E >= scores.I ? 'E' : 'I',
    scores.S >= scores.N ? 'S' : 'N',
    scores.T >= scores.F ? 'T' : 'F',
    scores.J >= scores.P ? 'J' : 'P',
  ].join('');

  const potatoPower = {
    바삭함: (scores.S + scores.T) * 25,
    사교성: (scores.E + scores.F) * 25,
    모험심: (scores.N + scores.P) * 25,
    계획력: (scores.S + scores.J) * 25,
  };

  return { typeCode, scores, potatoPower };
}

export function calculateFriendType(answers: Record<number, 'A' | 'B'>): string {
  const scores: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  for (let q = 1; q <= 4; q++) {
    const answer = answers[q];
    if (!answer) continue;
    const mapping = FRIEND_SCORE_MAP[q][answer];
    Object.entries(mapping).forEach(([key, value]) => {
      scores[key] += value;
    });
  }

  return [
    scores.E >= scores.I ? 'E' : 'I',
    scores.S >= scores.N ? 'S' : 'N',
    scores.T >= scores.F ? 'T' : 'F',
    scores.J >= scores.P ? 'J' : 'P',
  ].join('');
}
