interface Props {
  potatoPower: {
    바삭함: number;
    사교성: number;
    모험심: number;
    계획력: number;
  };
}

const LABELS: { key: keyof Props['potatoPower']; emoji: string }[] = [
  { key: '바삭함', emoji: '🥨' },
  { key: '사교성', emoji: '🤝' },
  { key: '모험심', emoji: '🧭' },
  { key: '계획력', emoji: '📋' },
];

export default function PotatoChart({ potatoPower }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-lg">📊</span>
        <span className="text-[15px] font-bold text-text-primary">감자력</span>
      </div>
      {LABELS.map(({ key, emoji }) => {
        const value = potatoPower[key];
        return (
          <div key={key} className="flex items-center gap-3">
            <span className="text-[14px] w-[72px] text-text-secondary shrink-0 font-medium">
              {emoji} {key}
            </span>
            <div className="flex-1 h-[22px] bg-beige rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${value}%`,
                  background: 'linear-gradient(135deg, #F5B731 0%, #D4960A 100%)',
                  animation: 'progress-fill 1s ease-out',
                }}
              />
            </div>
            <span className="text-[14px] font-bold text-golden-dark w-12 text-right tabular-nums">
              {value}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
