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
      <p className="text-base font-semibold text-text-primary mb-3">📊 감자력</p>
      {LABELS.map(({ key, emoji }) => {
        const value = potatoPower[key];
        return (
          <div key={key} className="flex items-center gap-3">
            <span className="text-sm w-16 text-text-secondary shrink-0">
              {emoji} {key}
            </span>
            <div className="flex-1 h-5 bg-potato-light rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${value}%`,
                  background: 'linear-gradient(135deg, #E8B86D 0%, #C9923D 100%)',
                  animation: 'progress-fill 1s ease-out',
                }}
              />
            </div>
            <span className="text-sm font-semibold text-potato-dark w-12 text-right">
              {value}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
