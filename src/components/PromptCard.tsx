interface PromptCardProps {
  label: string;
  text: string;
}

export function PromptCard({ label, text }: PromptCardProps) {
  return (
    <section className="prompt-card" aria-label={label}>
      <p className="eyebrow">{label}</p>
      <p className="prompt-text">{text}</p>
    </section>
  );
}
