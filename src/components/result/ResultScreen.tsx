import { useRef, useState } from 'react';
import { useStore } from '../../store/useStore';
import { TYPE_DATA } from '../../data/types';
import { saveResultImage, copyShareLink, shareToKakao } from '../../utils/share';
import { trackEvent } from '../../utils/analytics';
import PotatoChart from './PotatoChart';

export default function ResultScreen() {
  const { resultType, potatoPower, resetTest, setScreen, showToast } = useStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!resultType || !potatoPower) return null;

  const typeData = TYPE_DATA[resultType];
  if (!typeData) return null;

  const handleSaveImage = async () => {
    if (!cardRef.current || isSaving) return;
    setIsSaving(true);
    try {
      await saveResultImage(cardRef.current, resultType);
      showToast('이미지가 저장되었습니다!');
    } catch {
      showToast('스크린샷으로 저장해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleShareKakao = () => {
    try {
      shareToKakao(resultType, typeData.name, typeData.shortDesc);
    } catch {
      showToast('링크 복사로 공유해보세요.');
    }
  };

  const handleCopyLink = async () => {
    const success = await copyShareLink(resultType);
    if (success) {
      showToast('링크가 복사되었습니다!');
    }
  };

  const handleRetry = () => {
    trackEvent('retry_click', { previous_type: resultType });
    resetTest();
  };

  return (
    <div className="flex flex-col items-center px-5 py-8 pb-24">
      {/* 결과 카드 (캡처 대상) */}
      <div
        ref={cardRef}
        className="w-full bg-white rounded-2xl overflow-hidden mb-8"
        style={{
          animation: 'fade-in-up 0.6s ease-out',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        {/* 상단 그라데이션 헤더 */}
        <div
          className="text-center pt-8 pb-6 px-6"
          style={{
            background: 'linear-gradient(180deg, #FFF3D6 0%, #FFFFFF 100%)',
          }}
        >
          <div className="text-[72px] mb-3">{typeData.emoji}</div>
          <p className="text-sm font-bold text-carrot tracking-widest mb-1">
            {typeData.code}
          </p>
          <h2 className="text-[26px] font-bold text-text-primary mb-2">
            "{typeData.name}"
          </h2>
          <p className="text-[15px] text-text-secondary leading-relaxed">{typeData.shortDesc}</p>
        </div>

        {/* 카드 본문 */}
        <div className="px-6 pb-7">
          {/* 상세 설명 */}
          <div className="bg-beige rounded-2xl p-5 mb-5">
            <p className="text-[15px] text-text-primary leading-[1.7] whitespace-pre-line">
              {typeData.longDesc}
            </p>
          </div>

          {/* 강점 & 약점 */}
          <div className="mb-5">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-lg">💪</span>
              <span className="text-[15px] font-bold text-text-primary">강점</span>
            </div>
            <div className="space-y-2 mb-5 pl-1">
              {typeData.strengths.map((s, i) => (
                <p key={i} className="text-[15px] text-text-secondary leading-relaxed flex items-start gap-2">
                  <span className="text-green shrink-0 mt-0.5">●</span>
                  {s}
                </p>
              ))}
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-lg">😅</span>
              <span className="text-[15px] font-bold text-text-primary">약점</span>
            </div>
            <div className="space-y-2 pl-1">
              {typeData.weaknesses.map((w, i) => (
                <p key={i} className="text-[15px] text-text-secondary leading-relaxed flex items-start gap-2">
                  <span className="text-ketchup shrink-0 mt-0.5">●</span>
                  {w}
                </p>
              ))}
            </div>
          </div>

          {/* 구분선 */}
          <div className="h-px bg-line mb-5" />

          {/* 궁합 정보 */}
          <div className="mb-5">
            <div className="mb-4">
              <span className="text-[15px] font-bold text-text-primary">💕 찰떡궁합</span>
              <div className="flex gap-2 mt-2.5 flex-wrap">
                {typeData.compatibility.best.map((code) => (
                  <span
                    key={code}
                    className="text-sm font-medium px-4 py-2 rounded-full"
                    style={{ background: '#FFF0DE', color: '#D4960A' }}
                  >
                    {code} {TYPE_DATA[code]?.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[15px] font-bold text-text-primary">⚡ 티격태격</span>
              <div className="flex gap-2 mt-2.5 flex-wrap">
                {typeData.compatibility.caution.map((code) => (
                  <span
                    key={code}
                    className="text-sm font-medium bg-gray-100 text-text-secondary px-4 py-2 rounded-full"
                  >
                    {code} {TYPE_DATA[code]?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="h-px bg-line mb-5" />

          {/* 감자력 차트 - 골든포테이토 바 */}
          <PotatoChart potatoPower={potatoPower} />

          {/* 추천 메뉴 */}
          <div className="text-center mt-6 mb-4 bg-golden-light rounded-2xl py-4 px-5">
            <p className="text-sm text-golden-dark font-semibold mb-1">추천 메뉴</p>
            <p className="text-lg font-bold text-text-primary">{typeData.recommendedMenu}</p>
          </div>

          {/* 명언 */}
          <div className="text-center">
            <p className="text-[14px] text-text-secondary italic leading-relaxed">
              "{typeData.quote}"
            </p>
          </div>

          {/* 해시태그 */}
          <div className="text-center mt-5">
            <p className="text-sm text-carrot font-medium">
              #감자유형테스트 #{typeData.code}감자 #{typeData.name}
            </p>
          </div>
        </div>
      </div>

      {/* 공유 버튼 그룹 */}
      <div
        className="flex gap-2.5 mb-8 w-full"
        style={{ animation: 'fade-in 0.6s ease-out 0.3s both' }}
      >
        <button
          onClick={handleSaveImage}
          disabled={isSaving}
          className="flex-1 flex flex-col items-center gap-1.5 py-4 bg-white rounded-2xl border border-line active:scale-[0.97] transition-transform cursor-pointer"
        >
          <span className="text-2xl">📸</span>
          <span className="text-[13px] font-medium text-text-secondary">
            {isSaving ? '저장중...' : '저장'}
          </span>
        </button>
        <button
          onClick={handleShareKakao}
          className="flex-1 flex flex-col items-center gap-1.5 py-4 bg-white rounded-2xl border border-line active:scale-[0.97] transition-transform cursor-pointer"
        >
          <span className="text-2xl">📲</span>
          <span className="text-[13px] font-medium text-text-secondary">카톡</span>
        </button>
        <button
          onClick={handleCopyLink}
          className="flex-1 flex flex-col items-center gap-1.5 py-4 bg-white rounded-2xl border border-line active:scale-[0.97] transition-transform cursor-pointer"
        >
          <span className="text-2xl">🔗</span>
          <span className="text-[13px] font-medium text-text-secondary">링크</span>
        </button>
        <button
          onClick={handleRetry}
          className="flex-1 flex flex-col items-center gap-1.5 py-4 bg-white rounded-2xl border border-line active:scale-[0.97] transition-transform cursor-pointer"
        >
          <span className="text-2xl">🔄</span>
          <span className="text-[13px] font-medium text-text-secondary">다시</span>
        </button>
      </div>

      {/* 확장 기능 링크 */}
      <div
        className="w-full space-y-3"
        style={{ animation: 'fade-in 0.6s ease-out 0.5s both' }}
      >
        <button
          onClick={() => {
            trackEvent('friend_predict_start');
            setScreen('friend');
          }}
          className="w-full py-4 px-5 bg-white rounded-2xl border border-line text-left flex items-center gap-3 hover:bg-beige/50 transition-colors cursor-pointer"
        >
          <span className="text-xl">🎯</span>
          <span className="text-[15px] font-semibold text-text-primary">친구 유형 예측하기</span>
        </button>
        <button
          onClick={() => setScreen('compatibility')}
          className="w-full py-4 px-5 bg-white rounded-2xl border border-line text-left flex items-center gap-3 hover:bg-beige/50 transition-colors cursor-pointer"
        >
          <span className="text-xl">💕</span>
          <span className="text-[15px] font-semibold text-text-primary">궁합 테스트</span>
        </button>
        <button
          onClick={() => {
            trackEvent('collection_view', { collected_count: 0 });
            setScreen('collection');
          }}
          className="w-full py-4 px-5 bg-white rounded-2xl border border-line text-left flex items-center gap-3 hover:bg-beige/50 transition-colors cursor-pointer"
        >
          <span className="text-xl">📚</span>
          <span className="text-[15px] font-semibold text-text-primary">16종 감자 도감 보기</span>
        </button>
      </div>
    </div>
  );
}
