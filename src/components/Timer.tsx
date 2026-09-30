import { useEffect, useState } from 'react';

interface TimerProps {
  seconds: number;
  label: string;
}

export function Timer({ seconds, label }: TimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const [deadline, setDeadline] = useState<number | null>(null);
  const running = deadline !== null;

  useEffect(() => {
    if (deadline === null) return;
    const tick = () => {
      const nextRemaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(nextRemaining);
      if (nextRemaining === 0) setDeadline(null);
    };
    tick();
    const interval = window.setInterval(tick, 200);
    return () => window.clearInterval(interval);
  }, [deadline]);

  const toggle = () => {
    if (deadline !== null) {
      setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
      setDeadline(null);
    } else {
      setDeadline(Date.now() + remaining * 1000);
    }
  };

  return (
    <section className="timer" aria-label={`${label} timer`}>
      <div>
        <p className="eyebrow">{label} · optional timer</p>
        <p className="timer-display" role="timer" aria-label={`${remaining} seconds remaining`}>
          {String(Math.floor(remaining / 60)).padStart(2, '0')}:{String(remaining % 60).padStart(2, '0')}
        </p>
      </div>
      <div className="timer-controls">
        <button className="button button-secondary" onClick={toggle} disabled={remaining === 0}>{running ? 'Pause' : remaining === seconds ? 'Start timer' : 'Resume'}</button>
        <button className="text-button" onClick={() => { setDeadline(null); setRemaining(seconds); }}>Reset</button>
      </div>
      <p className="timer-status" role="status">{remaining === 0 ? 'Time is up. Continue when you are ready.' : running ? 'Timer running. Speak at your own pace.' : 'Ready when you are.'}</p>
    </section>
  );
}
