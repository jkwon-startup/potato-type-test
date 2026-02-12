import { useState, useEffect, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { POTATO_TMI } from '../../data/types';
import { calculateType } from '../../utils/calculate';
import { saveToCollection, saveLastResult } from '../../utils/share';
import { trackEvent } from '../../utils/analytics';

const LOADING_STEPS = [
  { text: '감자를 씻는 중...', emoji: '🚿' },
  { text: '껍질 벗기는 중...', emoji: '🔪' },
  { text: '기름에 튀기는 중...', emoji: '🍳' },
  { text: '소금 뿌리는 중...', emoji: '🧂' },
  { text: '당신의 감자 유형 분석 중...', emoji: '📊' },
];

export default function LoadingScreen() {
  const { answers, setResult, startTime } = useStore();
  const [step, setStep] = useState(0);
  const randomTMI = useMemo(
    () => POTATO_TMI[Math.floor(Math.random() * POTATO_TMI.length)],
    []
  );
  const progress = ((step + 1) / LOADING_STEPS.length) * 100;

  // 결과 계산 (로딩 시작 시 즉시)
  useEffect(() => {
    const result = calculateType(answers);
    const duration = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

    setResult(result.typeCode, result.scores, result.potatoPower);
    saveToCollection(result.typeCode);
    saveLastResult({
      typeCode: result.typeCode,
      answers,
      scores: result.scores,
      potatoPower: result.potatoPower,
      duration,
      timestamp: Date.now(),
    });

    trackEvent('test_complete', {
      result_type: result.typeCode,
      duration_seconds: duration,
    });
  }, [answers, setResult, startTime]);

  // 단계별 텍스트 전환 + 5초 후 결과 화면 이동
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= LOADING_STEPS.length - 1) {
          clearInterval(timer);
          setTimeout(() => {
            useStore.setState({ currentScreen: 'result' });
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 py-10">
      {/* 감자 애니메이션 */}
      <div className="text-[88px] mb-10 select-none" style={{ animation: 'shake 0.5s ease-in-out infinite' }}>
        {step < 3 ? '🥔' : step < 4 ? '🍳' : '🍟'}
      </div>

      {/* 단계별 텍스트 */}
      <div
        className="text-[20px] font-semibold text-text-primary mb-2 text-center"
        key={step}
        style={{ animation: 'fade-in 0.3s ease-out' }}
      >
        {LOADING_STEPS[step].text} {LOADING_STEPS[step].emoji}
      </div>

      {/* 프로그레스 바 - 당근오렌지 그라데이션 */}
      <div className="w-full max-w-[280px] h-3 bg-beige rounded-full overflow-hidden mt-8 mb-10">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(135deg, #FF8A3D 0%, #F5B731 100%)',
          }}
        />
      </div>

      {/* 감자 TMI */}
      <div
        className="bg-white rounded-2xl p-5 w-full max-w-[320px] border border-line"
        style={{ animation: 'fade-in 0.6s ease-out 0.5s both' }}
      >
        <p className="text-[15px] text-golden-dark font-semibold mb-1.5">
          💡 감자 TMI
        </p>
        <p className="text-[15px] text-text-primary leading-relaxed">{randomTMI}</p>
      </div>
    </div>
  );
}
