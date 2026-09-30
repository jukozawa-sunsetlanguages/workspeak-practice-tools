import type { PracticeTool } from '../tool-schema';

export const meetingResponseDrill = {
  id: 'meeting-response-drill',
  title: 'Meeting Response Drill',
  description: 'A short practice in responding to a question during a meeting.',
  context: 'Workplace conversation',
  notice: 'Illustrative content only. This prototype does not define a WorkSpeak methodology or assess your performance.',
  completion: {
    title: 'Practice complete.',
    description: 'You have reached the end of this example. Revisit any step to review your notes, or start a fresh practice.',
  },
  steps: {
    moment: {
      introduction: 'Start with a specific situation. Read the moment below and imagine yourself in the conversation.',
      prompt: {
        label: 'The situation',
        text: 'You are in a team meeting. A colleague turns to you and asks: “Where are we with the project, and what do you need from us?”',
      },
      instructions: ['Take a moment to picture the meeting.', 'There is no correct answer to find. Use a real project or an imagined one.'],
      nextLabel: 'Explore the friction',
    },
    friction: {
      introduction: 'Notice what might make this moment difficult for you.',
      prompt: { label: 'Consider', text: 'What might get in the way of giving the response you want to give?' },
      fields: [{ id: 'friction', kind: 'text', label: 'What feels difficult?', placeholder: 'For example, choosing what to include when there is a lot to explain…', rows: 4 }],
    },
    target: {
      introduction: 'Choose one thing to focus on in this practice.',
      prompt: { label: 'Your focus', text: 'What would you like your colleague to understand after your response?' },
      fields: [{ id: 'target', kind: 'text', label: 'My focus for this response', placeholder: 'Write one specific intention…', rows: 3 }],
    },
    prepare: {
      introduction: 'Gather a few notes before you speak.',
      prompt: { label: 'Prepare your response', text: 'What is the current situation, and what do you need from the team?' },
      fields: [{ id: 'notes', kind: 'text', label: 'Preparation notes', placeholder: 'A few words or short sentences are enough…', hint: 'These are notes, not a script. You can return to this step at any time.', rows: 5 }],
    },
    practice: {
      introduction: 'Try your response out loud. The timer is optional; use it if it helps you keep this attempt short.',
      prompt: { label: 'Your colleague asks', text: '“Where are we with the project, and what do you need from us?”' },
      timer: { seconds: 60, label: 'First attempt' },
      instructions: ['Speak aloud when you are ready.', 'Nothing is recorded. Continue when you have finished.'],
    },
    repeat: {
      introduction: 'Try the same response again, changing one thing you noticed in your first attempt.',
      prompt: { label: 'Try again', text: '“Where are we with the project, and what do you need from us?”' },
      timer: { seconds: 60, label: 'Second attempt' },
      fields: [{ id: 'change', kind: 'text', label: 'The one thing I am changing', placeholder: 'Name a small change to try…', rows: 2 }],
    },
    reflect: {
      introduction: 'Pause and describe what you noticed, without needing to give yourself a score.',
      prompt: { label: 'Look back', text: 'What felt different between your first and second attempts?' },
      fields: [{ id: 'reflection', kind: 'reflection', label: 'What I noticed', placeholder: 'Write a brief reflection…', hint: 'You can leave any field blank. Your notes stay here only until this page is refreshed.', rows: 4 }],
    },
    evidence: {
      introduction: 'Separate what you observed from what you assumed.',
      prompt: { label: 'Check your observation', text: 'What specific words or actions from your attempt support your reflection?' },
      fields: [{ id: 'evidence', kind: 'reflection', label: 'An example from my response', placeholder: 'For example, I named the decision I needed from the team…', hint: 'This is your own observation, not an automated assessment.', rows: 4 }],
    },
    transfer: {
      introduction: 'Connect this practice to an actual conversation.',
      prompt: { label: 'Outside this practice', text: 'Where could you try a similar response in your work?' },
      fields: [{ id: 'transfer', kind: 'text', label: 'A conversation to try this in', placeholder: 'Name a meeting or situation…', rows: 3 }],
    },
    next: {
      introduction: 'Choose a small next action you can take after this practice.',
      prompt: { label: 'Your next step', text: 'What will you try, and when will you have the opportunity?' },
      fields: [{ id: 'action', kind: 'text', label: 'My next action', placeholder: 'In my next meeting, I will try…', rows: 3 }],
      nextLabel: 'Finish practice',
    },
  },
} satisfies PracticeTool;
