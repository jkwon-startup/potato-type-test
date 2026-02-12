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
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);

  const question = QUESTIONS[currentQuestion - 1];
  const total = QUESTIONS.length;
  const percentage = (currentQuestion / total) * 100;

  const handleAnswer = useCallback(
    (answer: 'A' | 'B') => {
      if (isTransitioning) return;

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

      setTimeout(() => {
        setIsTransitioning(true);
        setDirection('left');

        setTimeout(() => {
          setSelected(null);
          if (currentQuestion < total) {
            useStore.setState({ currentQuestion: currentQuestion + 1 });
          } else {
            // 마지막 질문 → 로딩 화면
            const duration = startTime
              ? Math.round((Date.now() - startTime) / 1000)
              : 0;
            trackEvent('test_complete_transition', { duration_seconds: duration });
            useStore.setState({ currentScreen: 'loading' });
          }
          setIsTransitioning(false);
        }, 300);
      }, 150);
    },
    [currentQuestion, isTransitioning, questionStartTime, answerQuestion, total, startTime]
  );

  const handleBack = useCallback(() => {
    if (isTransitioning || currentQuestion <= 1) return;

    trackEvent('question_back', { from_question: currentQuestion });

    setIsTransitioning(true);
    setDirection('right');

    setTimeout(() => {
      goToPreviousQuestion();
      setIsTransitioning(false);
    }, 300);
  }, [currentQuestion, isTransitioning, goToPreviousQuestion]);

  return (
    <div className="flex flex-col min-h-[100dvh] px-4 py-6">
      {/* 프로그레스 바 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 h-2 bg-potato-light rounded-full overflow-hidden mr-3">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${percentage}%`,
                background: 'linear-gradient(135deg, #E8B86D 0%, #C9923D 100%)',
              }}
            />
          </div>
          <span className="text-sm font-semibold text-text-secondary whitespace-nowrap">
            {currentQuestion}/{total}
          </span>
        </div>
      </div>

      {/* 질문 영역 */}
      <div
        className="flex-1 flex flex-col justify-center"
        key={currentQuestion}
        style={{
          animation: isTransitioning
            ? direction === 'left'
              ? 'slide-in-left 0.3s ease-out'
              : 'slide-in-right 0.3s ease-out'
            : direction === 'left'
              ? 'slide-in-right 0.3s ease-out'
              : 'slide-in-left 0.3s ease-out',
        }}
      >
        {/* 질문 번호 */}
        <p className="text-lg font-bold text-potato-dark mb-2">Q{currentQuestion}.</p>

        {/* 질문 텍스트 */}
        <h2 className="text-xl font-bold text-text-primary mb-8 leading-relaxed">
          {question.text}
        </h2>

        {/* 선택지 */}
        <div className="space-y-3">
          <button
            onClick={() => handleAnswer('A')}
            disabled={isTransitioning}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer min-h-[56px] ${
              selected === 'A'
                ? 'border-potato bg-potato-light scale-[0.98]'
                : answers[currentQuestion] === 'A'
                  ? 'border-potato/50 bg-potato-light/50'
                  : 'border-potato/30 bg-white hover:border-potato hover:bg-potato-light/30'
            }`}
            aria-label={`선택지 A: ${question.optionA.text}`}
          >
            <span className="text-base leading-relaxed">
              {question.optionA.emoji} {question.optionA.text}
            </span>
          </button>

          <button
            onClick={() => handleAnswer('B')}
            disabled={isTransitioning}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer min-h-[56px] ${
              selected === 'B'
                ? 'border-potato bg-potato-light scale-[0.98]'
                : answers[currentQuestion] === 'B'
                  ? 'border-potato/50 bg-potato-light/50'
                  : 'border-potato/30 bg-white hover:border-potato hover:bg-potato-light/30'
            }`}
            aria-label={`선택지 B: ${question.optionB.text}`}
          >
            <span className="text-base leading-relaxed">
              {question.optionB.emoji} {question.optionB.text}
            </span>
          </button>
        </div>
      </div>

      {/* 이전 버튼 */}
      <div className="mt-6 h-10">
        {currentQuestion > 1 && (
          <button
            onClick={handleBack}
            disabled={isTransitioning}
            className="text-text-secondary text-sm hover:text-text-primary transition-colors cursor-pointer"
            aria-label="이전 질문으로 돌아가기"
          >
            ← 이전
          </button>
        )}
      </div>
    </div>
  );
}
