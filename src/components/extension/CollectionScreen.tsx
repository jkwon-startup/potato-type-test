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
    <div className="flex flex-col items-center min-h-[100dvh] px-4 py-6">
      <button
        onClick={() => setScreen('result')}
        className="self-start text-sm text-text-secondary mb-6 cursor-pointer"
      >
        ← 돌아가기
      </button>

      <div className="text-[48px] mb-2">📚</div>
      <h2 className="text-xl font-bold text-text-primary mb-1">나의 감자 도감</h2>
      <p className="text-sm text-text-secondary mb-6">
        수집: <span className="font-bold text-potato-dark">{collection.length}</span>/16
      </p>

      {/* 4x4 그리드 */}
      <div
        className="grid grid-cols-4 gap-2 w-full max-w-[340px] mb-6"
        style={{ animation: 'fade-in 0.4s ease-out' }}
      >
        {ALL_TYPES.map((code) => {
          const isCollected = collection.includes(code);
          const data = TYPE_DATA[code];
          return (
            <button
              key={code}
              onClick={() => isCollected && setSelectedType(code)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 transition-all cursor-pointer ${
                isCollected
                  ? 'bg-white shadow-sm hover:shadow-md active:scale-[0.96]'
                  : 'bg-gray-200/50'
              }`}
            >
              <span className="text-2xl mb-0.5">
                {isCollected ? data.emoji : '❓'}
              </span>
              <span
                className={`text-[10px] font-medium ${
                  isCollected ? 'text-text-primary' : 'text-text-secondary/50'
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
        onClick={() => {
          resetTest();
        }}
        className="w-full max-w-[340px] py-3 rounded-xl text-sm font-medium text-white cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #E8B86D 0%, #C9923D 100%)' }}
      >
        🔄 다시 테스트해서 모아보세요!
      </button>

      {/* 상세 모달 */}
      {selectedType && selectedData && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedType(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-[360px] max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fade-in 0.3s ease-out' }}
          >
            <div className="text-center mb-4">
              <div className="text-[48px] mb-2">{selectedData.emoji}</div>
              <p className="text-sm font-semibold text-potato-dark">{selectedData.code}</p>
              <h3 className="text-xl font-bold text-text-primary">{selectedData.name}</h3>
              <p className="text-sm text-text-secondary mt-1">{selectedData.shortDesc}</p>
            </div>

            <div className="bg-bg rounded-xl p-3 mb-3">
              <p className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
                {selectedData.longDesc}
              </p>
            </div>

            <p className="text-xs text-text-secondary mb-1">추천: {selectedData.recommendedMenu}</p>
            <p className="text-xs text-text-secondary italic">"{selectedData.quote}"</p>

            <button
              onClick={() => setSelectedType(null)}
              className="w-full mt-4 py-3 rounded-xl bg-potato-light text-sm font-semibold text-potato-dark cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
