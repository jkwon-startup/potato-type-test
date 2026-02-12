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
    <div className="flex flex-col items-center min-h-[100dvh] px-6 py-6">
      <button
        onClick={() => setScreen('result')}
        className="self-start text-[15px] text-text-secondary mb-6 cursor-pointer font-medium"
      >
        ← 돌아가기
      </button>

      <div className="text-[48px] mb-3">💕</div>
      <h2 className="text-[22px] font-bold text-text-primary mb-6 text-center">
        감자 궁합 테스트
      </h2>

      {!showResult ? (
        <div className="w-full max-w-[340px] space-y-5" style={{ animation: 'fade-in 0.4s ease-out' }}>
          <div>
            <label className="text-[14px] font-bold text-text-primary mb-2 block">
              나의 유형
            </label>
            <select
              value={type1}
              onChange={(e) => setType1(e.target.value)}
              className="w-full p-4 rounded-2xl border-2 border-line bg-white text-[16px] outline-none focus:border-golden cursor-pointer"
            >
              <option value="">유형 선택</option>
              {ALL_TYPES.map((code) => (
                <option key={code} value={code}>
                  {code} {TYPE_DATA[code].name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[14px] font-bold text-text-primary mb-2 block">
              상대방 유형
            </label>
            <select
              value={type2}
              onChange={(e) => setType2(e.target.value)}
              className="w-full p-4 rounded-2xl border-2 border-line bg-white text-[16px] outline-none focus:border-golden cursor-pointer"
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
            className="w-full py-4 rounded-2xl text-white font-bold text-[16px] disabled:opacity-40 cursor-pointer mt-2 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #F5B731 0%, #D4960A 100%)' }}
          >
            궁합 확인하기
          </button>
        </div>
      ) : compat && typeData1 && typeData2 ? (
        <div className="w-full max-w-[380px]" style={{ animation: 'fade-in-up 0.6s ease-out' }}>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            {/* 헤더 */}
            <div
              className="text-center py-6 px-5"
              style={{ background: 'linear-gradient(180deg, #FFF3D6 0%, #FFFFFF 100%)' }}
            >
              <div className="flex items-center justify-center gap-4 text-3xl mb-3">
                <span>{typeData1.emoji}</span>
                <span className="text-ketchup text-xl">❤️</span>
                <span>{typeData2.emoji}</span>
              </div>
              <p className="text-[14px] text-text-secondary">
                {type1} {typeData1.name} × {type2} {typeData2.name}
              </p>
            </div>

            <div className="px-6 pb-6">
              {/* 점수 */}
              <div className="text-center mb-4">
                <p className="text-[40px] font-bold text-golden-dark mb-1">{compat.score}점</p>
                <p className="text-[15px] font-bold text-text-primary">{compat.label}</p>
              </div>

              {/* 점수 바 */}
              <div className="h-4 bg-beige rounded-full overflow-hidden mb-6">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${compat.score}%`,
                    background:
                      compat.score >= 80
                        ? 'linear-gradient(135deg, #E84C3D 0%, #F5B731 100%)'
                        : compat.score >= 60
                          ? 'linear-gradient(135deg, #F5B731 0%, #D4960A 100%)'
                          : 'linear-gradient(135deg, #718096 0%, #A0AEC0 100%)',
                    animation: 'progress-fill 1s ease-out',
                  }}
                />
              </div>

              {/* 궁합 포인트 */}
              <div className="mb-5">
                <p className="text-[15px] font-bold text-text-primary mb-3">🎯 궁합 포인트</p>
                <div className="space-y-2 pl-1">
                  {compat.points.map((p, i) => (
                    <p key={i} className="text-[14px] text-text-secondary flex items-start gap-2">
                      <span className="text-green shrink-0 mt-0.5">●</span>{p}
                    </p>
                  ))}
                </div>
              </div>

              {/* 주의점 */}
              <div>
                <p className="text-[15px] font-bold text-text-primary mb-3">⚠️ 주의할 점</p>
                <div className="space-y-2 pl-1">
                  {compat.warnings.map((w, i) => (
                    <p key={i} className="text-[14px] text-text-secondary flex items-start gap-2">
                      <span className="text-ketchup shrink-0 mt-0.5">●</span>{w}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowResult(false)}
            className="w-full py-4 mt-4 rounded-2xl text-[15px] font-semibold text-text-secondary bg-white border border-line cursor-pointer"
          >
            🔄 다른 유형으로 다시 해보기
          </button>
        </div>
      ) : null}
    </div>
  );
}
