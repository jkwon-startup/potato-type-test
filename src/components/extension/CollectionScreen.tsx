import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { TYPE_DATA } from '../../data/types';
import { getCollection } from '../../utils/share';
import { trackEvent } from '../../utils/analytics';

const ALL_TYPES = [
  'ENFP', 'ENFJ', 'ENTP', 'ENTJ',
  'ESFP', 'ESFJ', 'ESTP', 'ESTJ',
  'INFP', 'INFJ', 'INTP', 'INTJ',
  'ISFP', 'ISFJ', 'ISTP', 'ISTJ',
];

export default function CollectionScreen() {
  const { setScreen, resetTest } = useStore();
  const [collection, setCollection] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const collected = getCollection();
    setCollection(collected);
    trackEvent('collection_view', { collected_count: collected.length });
  }, []);

  const selectedData = selectedType ? TYPE_DATA[selectedType] : null;

  return (
    <div className="flex flex-col items-center min-h-[100dvh] px-6 py-6">
      <button
        onClick={() => setScreen('result')}
        className="self-start text-[15px] text-text-secondary mb-6 cursor-pointer font-medium"
      >
        ← 돌아가기
      </button>

      <div className="text-[48px] mb-2">📚</div>
      <h2 className="text-[22px] font-bold text-text-primary mb-1">나의 감자 도감</h2>
      <p className="text-[15px] text-text-secondary mb-6">
        수집: <span className="font-bold text-golden-dark">{collection.length}</span>/16
      </p>

      {/* 4x4 그리드 */}
      <div
        className="grid grid-cols-4 gap-2.5 w-full max-w-[340px] mb-6"
        style={{ animation: 'fade-in 0.4s ease-out' }}
      >
        {ALL_TYPES.map((code) => {
          const isCollected = collection.includes(code);
          const data = TYPE_DATA[code];
          return (
            <button
              key={code}
              onClick={() => isCollected && setSelectedType(code)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-1.5 transition-all cursor-pointer ${
                isCollected
                  ? 'bg-white border border-line hover:border-golden active:scale-[0.96]'
                  : 'bg-gray-100/60 border border-transparent'
              }`}
            >
              <span className="text-[26px] mb-0.5">
                {isCollected ? data.emoji : '❓'}
              </span>
              <span
                className={`text-[11px] font-semibold ${
                  isCollected ? 'text-text-primary' : 'text-text-secondary/40'
                }`}
              >
                {code}
              </span>
            </button>
          );
        })}
      </div>

      {/* 다시 테스트 유도 */}
      <button
        onClick={() => resetTest()}
        className="w-full max-w-[340px] py-4 rounded-2xl text-white font-bold text-[15px] cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #F5B731 0%, #D4960A 100%)' }}
      >
        🔄 다시 테스트해서 모아보세요!
      </button>

      {/* 상세 모달 */}
      {selectedType && selectedData && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5"
          onClick={() => setSelectedType(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden w-full max-w-[360px] max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fade-in-up 0.3s ease-out' }}
          >
            {/* 모달 헤더 */}
            <div
              className="text-center pt-6 pb-4 px-6"
              style={{ background: 'linear-gradient(180deg, #FFF3D6 0%, #FFFFFF 100%)' }}
            >
              <div className="text-[48px] mb-2">{selectedData.emoji}</div>
              <p className="text-sm font-bold text-carrot tracking-wider">{selectedData.code}</p>
              <h3 className="text-[20px] font-bold text-text-primary">{selectedData.name}</h3>
              <p className="text-[14px] text-text-secondary mt-1">{selectedData.shortDesc}</p>
            </div>

            <div className="px-6 pb-6">
              <div className="bg-beige rounded-2xl p-4 mb-4">
                <p className="text-[14px] text-text-primary leading-relaxed whitespace-pre-line">
                  {selectedData.longDesc}
                </p>
              </div>

              <p className="text-[13px] text-golden-dark font-semibold mb-1">
                추천: {selectedData.recommendedMenu}
              </p>
              <p className="text-[13px] text-text-secondary italic">
                "{selectedData.quote}"
              </p>

              <button
                onClick={() => setSelectedType(null)}
                className="w-full mt-5 py-3.5 rounded-2xl bg-beige text-[15px] font-bold text-golden-dark cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
