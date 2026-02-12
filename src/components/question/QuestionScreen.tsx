import { useState, useCallback } from 'react';
import { useStore } from '../../store/useStore';
import { QUESTIONS } from '../../data/questions';
import { trackEvent } from '../../utils/analytics';

export default function QuestionScreen() {
  const {
    currentQuestion,
    answers,
    answerQuestion,
    goToPreviousQuestion,
    questionStartTime,
    startTime,
  } = useStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);
  const [opacity, setOpacity] = useState(1);

  const question = QUESTIONS[currentQuestion - 1];
  const total = QUESTIONS.length;
  const percentage = (currentQuestion / total) * 100;

  const transitionToNext = useCallback(
    (next: () => void) => {
      setOpacity(0);
      setTimeout(() => {
        next();
        setSelected(null);
        setOpacity(1);
        setIsTransitioning(false);
      }, 250);
    },
    []
  );

  const handleAnswer = useCallback(
    (answer: 'A' | 'B') => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setSelected(answer);

      const timeSpent = questionStartTime
        ? (Date.now() - questionStartTime) / 1000
        : 0;

      trackEvent('question_answer', {
        question_number: currentQuestion,
        answer,
        time_spent: Math.round(timeSpent * 10) / 10,
      });

      answerQuestion(currentQuestion, answer);

      // 선택 피드백 잠깐 보여준 후 부드럽게 전환
      setTimeout(() => {
        if (currentQuestion < total) {
          transitionToNext(() => {
            useStore.setState({ currentQuestion: currentQuestion + 1 });
          });
        } else {
          const duration = startTime
            ? Math.round((Date.now() - startTime) / 1000)
            : 0;
          trackEvent('test_complete_transition', { duration_seconds: duration });
          transitionToNext(() => {
            useStore.setState({ currentScreen: 'loading' });
          });
        }
      }, 200);
    },
    [currentQuestion, isTransitioning, questionStartTime, answerQuestion, total, startTime, transitionToNext]
  );

  const handleBack = useCallback(() => {
    if (isTransitioning || currentQuestion <= 1) return;
    setIsTransitioning(true);

    trackEvent('question_back', { from_question: currentQuestion });

    transitionToNext(() => {
      goToPreviousQuestion();
    });
  }, [currentQuestion, isTransitioning, goToPreviousQuestion, transitionToNext]);

  return (
    <div className="flex flex-col min-h-[100dvh] px-6 pt-6 pb-8">
      {/* 프로그레스 바 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 h-2.5 bg-potato-light rounded-full overflow-hidden mr-3">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${percentage}%`,
                background: 'linear-gradient(135deg, #E8B86D 0%, #C9923D 100%)',
              }}
            />
          </div>
          <span className="text-base font-semibold text-text-secondary whitespace-nowrap">
            {currentQuestion}/{total}
          </span>
        </div>
      </div>

      {/* 질문 영역 - 상단 40% 지점에 배치 */}
      <div
        className="flex-1 flex flex-col pt-[12vh]"
        style={{
          opacity,
          transform: opacity === 1 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        {/* 질문 번호 */}
        <p className="text-xl font-bold text-potato-dark mb-3">Q{currentQuestion}.</p>

        {/* 질문 텍스트 */}
        <h2 className="text-[22px] font-bold text-text-primary mb-10 leading-relaxed">
          {question.text}
        </h2>

        {/* 선택지 */}
        <div className="space-y-4">
          <button
            onClick={() => handleAnswer('A')}
            disabled={isTransitioning}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer min-h-[64px] ${
              selected === 'A'
                ? 'border-potato bg-potato-light scale-[0.98]'
                : answers[currentQuestion] === 'A'
                  ? 'border-potato/50 bg-potato-light/50'
                  : 'border-potato/30 bg-white hover:border-potato hover:bg-potato-light/30'
            }`}
            aria-label={`선택지 A: ${question.optionA.text}`}
          >
            <span className="text-[17px] leading-relaxed">
              {question.optionA.emoji} {question.optionA.text}
            </span>
          </button>

          <button
            onClick={() => handleAnswer('B')}
            disabled={isTransitioning}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer min-h-[64px] ${
              selected === 'B'
                ? 'border-potato bg-potato-light scale-[0.98]'
                : answers[currentQuestion] === 'B'
                  ? 'border-potato/50 bg-potato-light/50'
                  : 'border-potato/30 bg-white hover:border-potato hover:bg-potato-light/30'
            }`}
            aria-label={`선택지 B: ${question.optionB.text}`}
          >
            <span className="text-[17px] leading-relaxed">
              {question.optionB.emoji} {question.optionB.text}
            </span>
          </button>
        </div>
      </div>

      {/* 이전 버튼 */}
      <div className="mt-6 h-12 shrink-0">
        {currentQuestion > 1 && (
          <button
            onClick={handleBack}
            disabled={isTransitioning}
            className="text-text-secondary text-base hover:text-text-primary transition-colors cursor-pointer"
            aria-label="이전 질문으로 돌아가기"
          >
            ← 이전
          </button>
        )}
      </div>
    </div>
  );
}
