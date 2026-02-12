import { useState, useCallback } from 'react';
import { useStore } from '../../store/useStore';
import { FRIEND_QUESTIONS, TYPE_DATA } from '../../data/types';
import { calculateFriendType } from '../../utils/calculate';
import { copyShareLink } from '../../utils/share';
import { trackEvent } from '../../utils/analytics';

type Phase = 'name' | 'question' | 'result';

export default function FriendPredictScreen() {
  const { setScreen, showToast } = useStore();
  const [phase, setPhase] = useState<Phase>('name');
  const [friendName, setFriendName] = useState('');
  const [currentQ, setCurrentQ] = useState(1);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [resultType, setResultType] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNameSubmit = () => {
    if (!friendName.trim()) return;
    setPhase('question');
  };

  const handleAnswer = useCallback(
    (answer: 'A' | 'B') => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      const newAnswers = { ...answers, [currentQ]: answer };
      setAnswers(newAnswers);

      setTimeout(() => {
        if (currentQ < FRIEND_QUESTIONS.length) {
          setCurrentQ(currentQ + 1);
        } else {
          const type = calculateFriendType(newAnswers);
          setResultType(type);
          trackEvent('friend_predict_complete', { predicted_type: type });
          setPhase('result');
        }
        setIsTransitioning(false);
      }, 400);
    },
    [currentQ, answers, isTransitioning]
  );

  const handleShareLink = async () => {
    const success = await copyShareLink(resultType || '');
    if (success) showToast('링크가 복사되었습니다!');
  };

  // 이름 입력
  if (phase === 'name') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-8">
        <button
          onClick={() => setScreen('result')}
          className="self-start text-sm text-text-secondary mb-8 cursor-pointer"
        >
          ← 돌아가기
        </button>

        <div className="text-[56px] mb-6">🎯</div>
        <h2 className="text-xl font-bold text-text-primary mb-2 text-center">
          친구 유형 예측하기
        </h2>
        <p className="text-sm text-text-secondary mb-8 text-center">
          친구 이름을 입력하고 4개 질문에 답해보세요!
        </p>

        <input
          type="text"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value.slice(0, 10))}
          placeholder="친구 이름 또는 닉네임"
          maxLength={10}
          className="w-full max-w-[300px] p-4 rounded-xl border-2 border-potato/30 text-center text-base outline-none focus:border-potato transition-colors bg-white"
          onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
        />
        <p className="text-xs text-text-secondary mt-2">{friendName.length}/10</p>

        <button
          onClick={handleNameSubmit}
          disabled={!friendName.trim()}
          className="mt-6 w-full max-w-[300px] py-4 rounded-xl text-white font-semibold disabled:opacity-50 cursor-pointer transition-opacity"
          style={{ background: 'linear-gradient(135deg, #E8B86D 0%, #C9923D 100%)' }}
        >
          시작하기
        </button>
      </div>
    );
  }

  // 질문
  if (phase === 'question') {
    const q = FRIEND_QUESTIONS[currentQ - 1];
    return (
      <div className="flex flex-col min-h-[100dvh] px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 h-2 bg-potato-light rounded-full overflow-hidden mr-3">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(currentQ / FRIEND_QUESTIONS.length) * 100}%`,
                  background: 'linear-gradient(135deg, #E8B86D 0%, #C9923D 100%)',
                }}
              />
            </div>
            <span className="text-sm font-semibold text-text-secondary">
              {currentQ}/{FRIEND_QUESTIONS.length}
            </span>
          </div>
        </div>

        <div
          className="flex-1 flex flex-col justify-center"
          key={currentQ}
          style={{ animation: 'slide-in-right 0.3s ease-out' }}
        >
          <p className="text-sm text-potato-dark font-semibold mb-1">
            {friendName}님에 대해...
          </p>
          <p className="text-lg font-bold text-text-primary mb-2">Q{currentQ}.</p>
          <h2 className="text-xl font-bold text-text-primary mb-8 leading-relaxed">
            {q.text}
          </h2>

          <div className="space-y-3">
            <button
              onClick={() => handleAnswer('A')}
              disabled={isTransitioning}
              className="w-full text-left p-4 rounded-xl border-2 border-potato/30 bg-white hover:border-potato hover:bg-potato-light/30 transition-all cursor-pointer min-h-[56px]"
            >
              {q.optionA.emoji} {q.optionA.text}
            </button>
            <button
              onClick={() => handleAnswer('B')}
              disabled={isTransitioning}
              className="w-full text-left p-4 rounded-xl border-2 border-potato/30 bg-white hover:border-potato hover:bg-potato-light/30 transition-all cursor-pointer min-h-[56px]"
            >
              {q.optionB.emoji} {q.optionB.text}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 결과
  const typeData = resultType ? TYPE_DATA[resultType] : null;
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-8">
      <div
        className="text-center"
        style={{ animation: 'fade-in 0.6s ease-out' }}
      >
        <div className="text-[64px] mb-4">{typeData?.emoji || '🥔'}</div>
        <p className="text-sm text-text-secondary mb-2">예측 결과</p>
        <h2 className="text-xl font-bold text-text-primary mb-1">
          {friendName}님은
        </h2>
        <p className="text-2xl font-bold text-potato-dark mb-1">
          {resultType} {typeData?.name}
        </p>
        <p className="text-base text-text-secondary mb-8">
          일 것 같아요!
        </p>
        <p className="text-sm text-text-secondary mb-8 bg-white rounded-xl p-4">
          {typeData?.shortDesc}
        </p>
      </div>

      <button
        onClick={handleShareLink}
        className="w-full max-w-[300px] py-4 rounded-xl text-white font-semibold cursor-pointer mb-3"
        style={{ background: 'linear-gradient(135deg, #E8B86D 0%, #C9923D 100%)' }}
      >
        🔗 친구에게 테스트 보내기
      </button>

      <button
        onClick={() => setScreen('result')}
        className="text-sm text-text-secondary cursor-pointer"
      >
        ← 결과로 돌아가기
      </button>
    </div>
  );
}
