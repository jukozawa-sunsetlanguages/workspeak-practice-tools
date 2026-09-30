export const stepSequence = [
  { id: 'moment', title: 'The Moment' },
  { id: 'friction', title: 'The Friction' },
  { id: 'target', title: 'The Target' },
  { id: 'prepare', title: 'Prepare' },
  { id: 'practice', title: 'Practice' },
  { id: 'repeat', title: 'Repeat' },
  { id: 'reflect', title: 'Reflect' },
  { id: 'evidence', title: 'Evidence Check' },
  { id: 'transfer', title: 'Transfer' },
  { id: 'next', title: 'Next Step' },
] as const;

export type StepId = (typeof stepSequence)[number]['id'];

export interface ToolField {
  id: string;
  kind: 'text' | 'reflection';
  label: string;
  placeholder?: string;
  hint?: string;
  rows?: number;
}

export interface StepContent {
  introduction: string;
  prompt: { label: string; text: string };
  instructions?: string[];
  fields?: ToolField[];
  timer?: { seconds: number; label: string };
  nextLabel?: string;
}

export interface PracticeTool {
  id: string;
  title: string;
  description: string;
  context: string;
  notice: string;
  completion: { title: string; description: string };
  steps: Record<StepId, StepContent>;
}
