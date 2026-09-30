import { useEffect, useRef, useState } from 'react';
import { PromptCard } from './components/PromptCard';
import { Timer } from './components/Timer';
import { TextInput } from './components/TextInput';
import { ReflectionField } from './components/ReflectionField';
import { Progress } from './components/Progress';
import { stepSequence, type PracticeTool } from './tool-schema';
import { meetingResponseDrill } from './tools/meeting-response';

export default function App({ tool = meetingResponseDrill }: { tool?: PracticeTool }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const restartConfirmation = useRef<HTMLDivElement>(null);
  const previousPosition = useRef('0-false');
  const step = stepSequence[stepIndex];
  const content = tool.steps[step.id];

  useEffect(() => {
    const position = `${stepIndex}-${complete}`;
    if (position !== previousPosition.current) heading.current?.focus();
    previousPosition.current = position;
  }, [stepIndex, complete]);

  useEffect(() => {
    if (confirmRestart) restartConfirmation.current?.focus();
  }, [confirmRestart]);

  const restart = () => {
    setAnswers({});
    setStepIndex(0);
    setComplete(false);
    setConfirmRestart(false);
  };

  const navigate = (index: number) => {
    setStepIndex(index);
    setComplete(false);
    setConfirmRestart(false);
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="WorkSpeak home">WorkSpeak<span className="wordmark-dot">.</span></a>
        <span className="header-label">Practice tools</span>
        <span className="prototype-label">Architectural prototype</span>
      </header>

      <main>
        <section className="tool-intro" aria-labelledby="tool-title">
          <p className="eyebrow section-kicker"><span className="small-line" /> A space to practice</p>
          <div className="intro-heading-row">
            <h1 id="tool-title">{tool.title}</h1>
            <button className="text-button restart-button" onClick={() => setConfirmRestart(!confirmRestart)} aria-label="Start over" aria-expanded={confirmRestart} aria-controls={confirmRestart ? 'restart-confirmation' : undefined}>↺ <span>Start over</span></button>
          </div>
          <p className="tool-description">{tool.description}</p>
          <div className="tool-meta"><span>{stepSequence.length} steps</span><span>Self-guided</span><span>{tool.context}</span></div>
          {confirmRestart && (
            <div ref={restartConfirmation} id="restart-confirmation" className="restart-confirmation" role="region" tabIndex={-1} aria-label="Confirm restart">
              <p>Start a fresh practice? Your current notes will be cleared.</p>
              <button className="button button-secondary" onClick={restart}>Clear notes and restart</button>
              <button className="text-button" onClick={() => setConfirmRestart(false)}>Keep practicing</button>
            </div>
          )}
        </section>

        <div className="practice-layout">
          <aside className="practice-sidebar">
            <Progress current={stepIndex + 1} total={stepSequence.length} complete={complete} />
            <nav aria-label="Practice steps">
              <ol className="step-list">
                {stepSequence.map((item, index) => (
                  <li key={item.id}>
                    <button className={`step-link ${index === stepIndex && !complete ? 'is-current' : ''}`} onClick={() => navigate(index)} aria-current={index === stepIndex && !complete ? 'step' : undefined}>
                      <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                      <span>{item.title}</span>
                      {index === stepIndex && !complete && <span className="current-indicator" aria-hidden="true" />}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
            <p className="sidebar-note">Move at your own pace.<br />You can revisit any step.</p>
          </aside>

          <section className="practice-content" aria-labelledby="step-heading">
            <p className="eyebrow step-kicker">{complete ? 'End of practice' : `Step ${String(stepIndex + 1).padStart(2, '0')} of ${stepSequence.length}`}</p>
            <h2 ref={heading} tabIndex={-1} id="step-heading">{complete ? tool.completion.title : step.title}</h2>
            <p className="step-introduction">{complete ? tool.completion.description : content.introduction}</p>

            {!complete && (
              <div className="step-body" key={step.id}>
                <PromptCard {...content.prompt} />
                {content.instructions && <ul className="instructions">{content.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ul>}
                {content.timer && <Timer {...content.timer} />}
                {content.fields?.map((field) => {
                  const Field = field.kind === 'reflection' ? ReflectionField : TextInput;
                  const fieldKey = `${step.id}:${field.id}`;
                  return <Field key={field.id} {...field} id={fieldKey} value={answers[fieldKey] ?? ''} onChange={(value) => setAnswers((current) => ({ ...current, [fieldKey]: value }))} />;
                })}
              </div>
            )}

            <div className="step-actions">
              <button className="text-button back-button" disabled={stepIndex === 0 && !complete} onClick={() => navigate(complete ? stepIndex : stepIndex - 1)}>← <span>{complete ? 'Review next step' : 'Back'}</span></button>
              {complete ? (
                <button className="button button-primary" onClick={() => setConfirmRestart(true)}>Start a fresh practice <span aria-hidden="true">↗</span></button>
              ) : (
                <button className="button button-primary" onClick={() => stepIndex === stepSequence.length - 1 ? setComplete(true) : navigate(stepIndex + 1)}>{content.nextLabel ?? 'Continue'} <span aria-hidden="true">→</span></button>
              )}
            </div>
            <p className="session-note">No recording. No scoring. Notes are cleared on refresh.</p>
          </section>
        </div>
      </main>

      <footer className="site-footer"><span>WorkSpeak / Practice Tools</span><p>{tool.notice}</p></footer>
    </div>
  );
}
