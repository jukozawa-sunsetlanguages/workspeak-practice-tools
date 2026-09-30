interface ProgressProps {
  current: number;
  total: number;
  complete: boolean;
}

export function Progress({ current, total, complete }: ProgressProps) {
  return (
    <div className="progress">
      <div className="progress-label">
        <span>{complete ? 'Practice complete' : 'Your practice'}</span>
        <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
      <progress max={total} value={current} aria-label="Position in practice" />
    </div>
  );
}
