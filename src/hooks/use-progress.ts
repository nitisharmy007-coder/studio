"use client";

import { useState, useEffect, useCallback } from "react";

type Progress = {
  completedConcepts: string[];
  quizScores: Record<string, { score: number; total: number }>;
};

const PROGRESS_KEY = "learnweb-progress";

const getInitialProgress = (): Progress => {
  if (typeof window === "undefined") {
    return { completedConcepts: [], quizScores: {} };
  }
  try {
    const item = window.localStorage.getItem(PROGRESS_KEY);
    return item ? JSON.parse(item) : { completedConcepts: [], quizScores: {} };
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return { completedConcepts: [], quizScores: {} };
  }
};

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({ completedConcepts: [], quizScores: {} });

  useEffect(() => {
    setProgress(getInitialProgress());
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
        } catch (error) {
            console.error("Error writing to localStorage", error);
        }
    }
  }, [progress]);

  const completeConcept = useCallback((conceptSlug: string) => {
    setProgress((p) => {
      if (p.completedConcepts.includes(conceptSlug)) {
        return p;
      }
      return {
        ...p,
        completedConcepts: [...p.completedConcepts, conceptSlug],
      };
    });
  }, []);

  const saveQuizScore = useCallback((conceptSlug: string, score: number, total: number) => {
    setProgress((p) => ({
      ...p,
      quizScores: {
        ...p.quizScores,
        [conceptSlug]: { score, total },
      },
    }));
    if (score / total >= 0.5) {
      completeConcept(conceptSlug);
    }
  }, [completeConcept]);

  const resetProgress = useCallback(() => {
    const initialProgress = { completedConcepts: [], quizScores: {} };
    setProgress(initialProgress);
  }, []);

  return { progress, completeConcept, saveQuizScore, resetProgress };
}
