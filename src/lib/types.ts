import type { LucideIcon } from "lucide-react";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type Concept = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  codeSnippet: {
    language: string;
    code: string;
  };
  interactiveExample?: {
    initialCode: string;
  };
  quiz: QuizQuestion[];
};
