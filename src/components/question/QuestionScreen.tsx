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
      {/* 프로그레스 바 - 당근오렌지 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex-1 h-2.5 bg-beige rounded-full overflow-hidden mr-3">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${percentage}%`,
                background: 'linear-gradient(135deg, #FF8A3D 0%, #F5B731 100%)',
              }}
            />
          </div>
          <span className="text-[15px] font-bold text-carrot whitespace-nowrap tabular-nums">
            {currentQuestion}/{total}
          </span>
        </div>
      </div>

      {/* 질문 영역 */}
      <div
        className="flex-1 flex flex-col pt-[10vh]"
        style={{
          opacity,
          transform: opacity === 1 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        {/* 질문 번호 */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="bg-golden text-white text-sm font-bold px-3 py-1 rounded-lg">
            Q{currentQuestion}
          </span>
        </div>

        {/* 질문 텍스트 */}
        <h2 className="text-[22px] font-bold text-text-primary mb-10 leading-[1.5]">
          {question.text}
        </h2>

        {/* 선택지 */}
        <div className="space-y-3.5">
          <button
            onClick={() => handleAnswer('A')}
            disabled={isTransitioning}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer min-h-[68px] ${
              selected === 'A'
                ? 'border-golden bg-golden-light scale-[0.98]'
                : answers[currentQuestion] === 'A'
                  ? 'border-golden/50 bg-golden-light/50'
                  : 'border-line bg-white hover:border-carrot/60 hover:bg-beige/50'
            }`}
            aria-label={`선택지 A: ${question.optionA.text}`}
          >
            <span className="text-[17px] leading-relaxed font-medium">
              {question.optionA.emoji} {question.optionA.text}
            </span>
          </button>

          <button
            onClick={() => handleAnswer('B')}
            disabled={isTransitioning}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer min-h-[68px] ${
              selected === 'B'
                ? 'border-golden bg-golden-light scale-[0.98]'
                : answers[currentQuestion] === 'B'
                  ? 'border-golden/50 bg-golden-light/50'
                  : 'border-line bg-white hover:border-carrot/60 hover:bg-beige/50'
            }`}
            aria-label={`선택지 B: ${question.optionB.text}`}
          >
            <span className="text-[17px] leading-relaxed font-medium">
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
            className="text-text-secondary text-[15px] font-medium hover:text-text-primary transition-colors cursor-pointer"
            aria-label="이전 질문으로 돌아가기"
          >
            ← 이전 질문
          </button>
        )}
      </div>
    </div>
  );
}
