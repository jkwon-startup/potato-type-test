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
      return '3층까지 올라오는 동안, 당신의 감자 유형을 알아보세요!';
    }
    if (source === 'share' && ref) {
      const typeName = TYPE_DATA[ref]?.name || '감자';
      return `친구는 [${ref} ${typeName}]래요. 당신은?`;
    }
    return '8개 질문으로 알아보는 나의 감자 유형';
  }

  function handleStart() {
    trackEvent('test_start', { source });
    startTest();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 py-10">
      {/* 감자 캐릭터 애니메이션 */}
      <div
        className="text-[96px] mb-8 select-none"
        style={{ animation: 'bounce-potato 0.8s ease-in-out infinite' }}
        role="img"
        aria-label="감자 캐릭터"
      >
        🥔
      </div>

      {/* 타이틀 */}
      <h1
        className="text-[28px] font-bold text-text-primary mb-4 text-center"
        style={{ animation: 'fade-in 0.6s ease-out' }}
      >
        당신은 어떤 감자입니까?
      </h1>

      {/* 서브카피 */}
      <p
        className="text-lg text-text-secondary text-center mb-12 px-2 leading-relaxed"
        style={{ animation: 'fade-in 0.6s ease-out 0.2s both' }}
      >
        {getSubCopy()}
      </p>

      {/* CTA 버튼 */}
      <button
        onClick={handleStart}
        className="w-full max-w-[340px] py-5 px-8 rounded-2xl text-white font-bold text-xl shadow-lg active:scale-[0.98] transition-transform duration-200 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #E8B86D 0%, #C9923D 100%)',
          boxShadow: '0 4px 16px rgba(201, 146, 61, 0.35)',
          animation: 'fade-in 0.6s ease-out 0.4s both',
        }}
        aria-label="감자 유형 테스트 시작"
      >
        🥔 감자 유형 알아보기
      </button>

      {/* 소요시간 안내 */}
      <p
        className="text-base text-text-secondary mt-5"
        style={{ animation: 'fade-in 0.6s ease-out 0.6s both' }}
      >
        약 1분 30초 소요
      </p>
    </div>
  );
}
