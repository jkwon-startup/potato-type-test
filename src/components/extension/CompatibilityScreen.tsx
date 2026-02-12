import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { TYPE_DATA, getCompatibility } from '../../data/types';

const ALL_TYPES = Object.keys(TYPE_DATA);

export default function CompatibilityScreen() {
  const { resultType, setScreen } = useStore();
  const [type1, setType1] = useState(resultType || '');
  const [type2, setType2] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleTest = () => {
    if (type1 && type2) {
      setShowResult(true);
    }
  };

  const compat = showResult && type1 && type2 ? getCompatibility(type1, type2) : null;
  const typeData1 = type1 ? TYPE_DATA[type1] : null;
  const typeData2 = type2 ? TYPE_DATA[type2] : null;

  return (
    <div className="flex flex-col items-center min-h-[100dvh] px-4 py-6">
      <button
        onClick={() => setScreen('result')}
        className="self-start text-sm text-text-secondary mb-6 cursor-pointer"
      >
        ← 돌아가기
      </button>

      <div className="text-[48px] mb-4">💕</div>
      <h2 className="text-xl font-bold text-text-primary mb-6 text-center">
        감자 궁합 테스트
      </h2>

      {!showResult ? (
        <div className="w-full max-w-[340px] space-y-4" style={{ animation: 'fade-in 0.4s ease-out' }}>
          {/* 본인 유형 */}
          <div>
            <label className="text-sm font-semibold text-text-primary mb-2 block">
              나의 유형
            </label>
            <select
              value={type1}
              onChange={(e) => setType1(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-potato/30 bg-white text-base outline-none focus:border-potato cursor-pointer"
            >
              <option value="">유형 선택</option>
              {ALL_TYPES.map((code) => (
                <option key={code} value={code}>
                  {code} {TYPE_DATA[code].name}
                </option>
              ))}
            </select>
          </div>

          {/* 상대 유형 */}
          <div>
            <label className="text-sm font-semibold text-text-primary mb-2 block">
              상대방 유형
            </label>
            <select
              value={type2}
              onChange={(e) => setType2(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-potato/30 bg-white text-base outline-none focus:border-potato cursor-pointer"
            >
              <option value="">유형 선택</option>
              {ALL_TYPES.map((code) => (
                <option key={code} value={code}>
                  {code} {TYPE_DATA[code].name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleTest}
            disabled={!type1 || !type2}
            className="w-full py-4 rounded-xl text-white font-semibold disabled:opacity-50 cursor-pointer mt-4 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #E8B86D 0%, #C9923D 100%)' }}
          >
            궁합 확인하기
          </button>
        </div>
      ) : compat && typeData1 && typeData2 ? (
        <div className="w-full max-w-[380px]" style={{ animation: 'fade-in 0.6s ease-out' }}>
          {/* 궁합 결과 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-3 text-3xl mb-3">
                <span>{typeData1.emoji}</span>
                <span className="text-ketchup">❤️</span>
                <span>{typeData2.emoji}</span>
              </div>
              <p className="text-sm text-text-secondary">
                {type1} {typeData1.name} × {type2} {typeData2.name}
              </p>
            </div>

            {/* 점수 */}
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-potato-dark mb-1">{compat.score}점</p>
              <p className="text-sm font-semibold text-text-primary">{compat.label}</p>
            </div>

            {/* 점수 바 */}
            <div className="h-4 bg-potato-light rounded-full overflow-hidden mb-6">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${compat.score}%`,
                  background:
                    compat.score >= 80
                      ? 'linear-gradient(135deg, #E53E3E 0%, #E8B86D 100%)'
                      : compat.score >= 60
                        ? 'linear-gradient(135deg, #E8B86D 0%, #C9923D 100%)'
                        : 'linear-gradient(135deg, #718096 0%, #A0AEC0 100%)',
                  animation: 'progress-fill 1s ease-out',
                }}
              />
            </div>

            {/* 궁합 포인트 */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-text-primary mb-2">🎯 궁합 포인트</p>
              <div className="space-y-1">
                {compat.points.map((p, i) => (
                  <p key={i} className="text-sm text-text-secondary">• {p}</p>
                ))}
              </div>
            </div>

            {/* 주의점 */}
            <div>
              <p className="text-sm font-semibold text-text-primary mb-2">⚠️ 주의할 점</p>
              <div className="space-y-1">
                {compat.warnings.map((w, i) => (
                  <p key={i} className="text-sm text-text-secondary">• {w}</p>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowResult(false)}
            className="w-full py-3 mt-4 rounded-xl text-sm font-medium text-text-secondary bg-white shadow-sm cursor-pointer"
          >
            🔄 다른 유형으로 다시 해보기
          </button>
        </div>
      ) : null}
    </div>
  );
}
