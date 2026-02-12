import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { TYPE_DATA } from '../../data/types';
import { trackEvent } from '../../utils/analytics';

export default function IntroScreen() {
  const { startTest, source, ref } = useStore();

  useEffect(() => {
    trackEvent('page_view', { source, ref });
  }, [source, ref]);

  function getSubCopy() {
    if (source === 'qr') {
      return '3층까지 올라오는 동안,\n당신의 감자 유형을 알아보세요!';
    }
    if (source === 'share' && ref) {
      const typeName = TYPE_DATA[ref]?.name || '감자';
      return `친구는 [${ref} ${typeName}]래요.\n당신은 어떤 감자일까요?`;
    }
    return '8개 질문으로 알아보는\n나의 감자 유형';
  }

  function handleStart() {
    trackEvent('test_start', { source });
    startTest();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 py-10 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-12 left-6 text-3xl opacity-20 select-none" style={{ animation: 'float 4s ease-in-out infinite' }}>🍟</div>
      <div className="absolute top-24 right-8 text-2xl opacity-15 select-none" style={{ animation: 'float 5s ease-in-out infinite 1s' }}>🧂</div>
      <div className="absolute bottom-32 left-10 text-2xl opacity-15 select-none" style={{ animation: 'float 4.5s ease-in-out infinite 0.5s' }}>🥔</div>
      <div className="absolute bottom-20 right-6 text-3xl opacity-20 select-none" style={{ animation: 'float 3.5s ease-in-out infinite 1.5s' }}>🍳</div>

      {/* 감자 캐릭터 애니메이션 */}
      <div
        className="text-[100px] mb-6 select-none relative"
        style={{ animation: 'bounce-potato 1s ease-in-out infinite' }}
        role="img"
        aria-label="감자 캐릭터"
      >
        🥔
      </div>

      {/* 브랜드 라벨 */}
      <div
        className="inline-flex items-center gap-1.5 bg-golden-light text-golden-dark text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
        style={{ animation: 'fade-in 0.6s ease-out' }}
      >
        <span>🥔</span> PTI · Potato Type Indicator
      </div>

      {/* 타이틀 */}
      <h1
        className="text-[28px] font-bold text-text-primary mb-3 text-center leading-tight"
        style={{ animation: 'fade-in 0.6s ease-out 0.1s both' }}
      >
        당신은 어떤 감자입니까?
      </h1>

      {/* 서브카피 */}
      <p
        className="text-[17px] text-text-secondary text-center mb-10 leading-relaxed whitespace-pre-line"
        style={{ animation: 'fade-in 0.6s ease-out 0.2s both' }}
      >
        {getSubCopy()}
      </p>

      {/* CTA 버튼 */}
      <button
        onClick={handleStart}
        className="w-full max-w-[320px] py-[18px] px-8 rounded-2xl text-white font-bold text-[18px] active:scale-[0.97] transition-transform duration-200 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #F5B731 0%, #D4960A 100%)',
          animation: 'fade-in 0.6s ease-out 0.4s both, pulse-glow 2s ease-in-out infinite 1s',
        }}
        aria-label="감자 유형 테스트 시작"
      >
        감자 유형 알아보기
      </button>

      {/* 소요시간 안내 */}
      <p
        className="text-[15px] text-text-secondary mt-5"
        style={{ animation: 'fade-in 0.6s ease-out 0.6s both' }}
      >
        약 1분 30초 소요
      </p>
    </div>
  );
}
