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
    <div className="flex flex-col items-center px-4 py-6 pb-20">
      {/* 결과 카드 (캡처 대상) */}
      <div
        ref={cardRef}
        className="w-full max-w-[380px] bg-white rounded-2xl shadow-lg p-6 mb-6"
        style={{ animation: 'fade-in 0.6s ease-out' }}
      >
        {/* 캐릭터 & 유형 */}
        <div className="text-center mb-4">
          <div className="text-[64px] mb-2">{typeData.emoji}</div>
          <p className="text-sm font-semibold text-potato-dark tracking-wider mb-1">
            {typeData.code}
          </p>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            "{typeData.name}"
          </h2>
          <p className="text-sm text-text-secondary">{typeData.shortDesc}</p>
        </div>

        {/* 상세 설명 */}
        <div className="bg-bg rounded-xl p-4 mb-4">
          <p className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
            {typeData.longDesc}
          </p>
        </div>

        {/* 강점 & 약점 */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-text-primary mb-2">💪 강점</p>
          <div className="space-y-1 mb-3">
            {typeData.strengths.map((s, i) => (
              <p key={i} className="text-sm text-text-secondary">{s}</p>
            ))}
          </div>
          <p className="text-sm font-semibold text-text-primary mb-2">😅 약점</p>
          <div className="space-y-1">
            {typeData.weaknesses.map((w, i) => (
              <p key={i} className="text-sm text-text-secondary">{w}</p>
            ))}
          </div>
        </div>

        {/* 궁합 정보 */}
        <div className="bg-bg rounded-xl p-4 mb-4">
          <div className="mb-2">
            <span className="text-sm font-semibold">💕 찰떡궁합</span>
            <div className="flex gap-2 mt-1 flex-wrap">
              {typeData.compatibility.best.map((code) => (
                <span key={code} className="text-xs bg-white rounded-full px-3 py-1 text-potato-dark font-medium">
                  {code} {TYPE_DATA[code]?.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold">⚡ 티격태격</span>
            <div className="flex gap-2 mt-1 flex-wrap">
              {typeData.compatibility.caution.map((code) => (
                <span key={code} className="text-xs bg-white rounded-full px-3 py-1 text-text-secondary font-medium">
                  {code} {TYPE_DATA[code]?.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 감자력 차트 */}
        <PotatoChart potatoPower={potatoPower} />

        {/* 추천 메뉴 */}
        <div className="text-center mt-4 mb-2">
          <p className="text-sm text-text-secondary">추천 메뉴</p>
          <p className="text-base font-semibold text-text-primary">{typeData.recommendedMenu}</p>
        </div>

        {/* 명언 */}
        <div className="text-center">
          <p className="text-xs text-text-secondary italic">"{typeData.quote}"</p>
        </div>

        {/* 해시태그 */}
        <div className="text-center mt-4">
          <p className="text-xs text-potato-dark">
            #감자유형테스트 #{typeData.code}감자 #{typeData.name}
          </p>
        </div>
      </div>

      {/* 공유 버튼 그룹 */}
      <div
        className="flex gap-3 mb-6 w-full max-w-[380px]"
        style={{ animation: 'fade-in 0.6s ease-out 0.3s both' }}
      >
        <button
          onClick={handleSaveImage}
          disabled={isSaving}
          className="flex-1 flex flex-col items-center gap-1 py-3 bg-white rounded-xl shadow-sm active:scale-[0.97] transition-transform cursor-pointer"
        >
          <span className="text-xl">📸</span>
          <span className="text-xs font-medium text-text-secondary">
            {isSaving ? '저장중...' : '저장'}
          </span>
        </button>
        <button
          onClick={handleShareKakao}
          className="flex-1 flex flex-col items-center gap-1 py-3 bg-white rounded-xl shadow-sm active:scale-[0.97] transition-transform cursor-pointer"
        >
          <span className="text-xl">📲</span>
          <span className="text-xs font-medium text-text-secondary">카톡</span>
        </button>
        <button
          onClick={handleCopyLink}
          className="flex-1 flex flex-col items-center gap-1 py-3 bg-white rounded-xl shadow-sm active:scale-[0.97] transition-transform cursor-pointer"
        >
          <span className="text-xl">🔗</span>
          <span className="text-xs font-medium text-text-secondary">링크</span>
        </button>
        <button
          onClick={handleRetry}
          className="flex-1 flex flex-col items-center gap-1 py-3 bg-white rounded-xl shadow-sm active:scale-[0.97] transition-transform cursor-pointer"
        >
          <span className="text-xl">🔄</span>
          <span className="text-xs font-medium text-text-secondary">다시</span>
        </button>
      </div>

      {/* 확장 기능 링크 */}
      <div
        className="w-full max-w-[380px] space-y-3"
        style={{ animation: 'fade-in 0.6s ease-out 0.5s both' }}
      >
        <button
          onClick={() => {
            trackEvent('friend_predict_start');
            setScreen('friend');
          }}
          className="w-full py-3 px-4 bg-white rounded-xl shadow-sm text-left text-sm font-medium text-text-primary hover:bg-potato-light/30 transition-colors cursor-pointer"
        >
          🎯 친구 유형 예측하기
        </button>
        <button
          onClick={() => setScreen('compatibility')}
          className="w-full py-3 px-4 bg-white rounded-xl shadow-sm text-left text-sm font-medium text-text-primary hover:bg-potato-light/30 transition-colors cursor-pointer"
        >
          💕 궁합 테스트
        </button>
        <button
          onClick={() => {
            trackEvent('collection_view', { collected_count: 0 });
            setScreen('collection');
          }}
          className="w-full py-3 px-4 bg-white rounded-xl shadow-sm text-left text-sm font-medium text-text-primary hover:bg-potato-light/30 transition-colors cursor-pointer"
        >
          📚 16종 감자 도감 보기
        </button>
      </div>
    </div>
  );
}
