"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/types";
import { useProgress } from "@/hooks/use-progress";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizProps {
  quiz: QuizQuestion[];
  conceptSlug: string;
}

export function Quiz({ quiz, conceptSlug }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const { saveQuizScore } = useProgress();

  const currentQuestion = quiz[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;
    setIsAnswered(true);
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    const newScore = isCorrect ? score + 1 : score;
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsQuizFinished(true);
      saveQuizScore(conceptSlug, isAnswered ? newScore : score, quiz.length);
    }
  };
  
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizFinished(false);
  }

  if (isQuizFinished) {
    const finalScore = isAnswered ? (isCorrect ? score + 1 : score) : score;
    const percentage = (finalScore / quiz.length) * 100;

    return (
      <div className="text-center space-y-4 p-4">
        <h3 className="text-2xl font-bold">Quiz Complete!</h3>
        <p className="text-lg">Your score: {finalScore} / {quiz.length}</p>
        <div className="flex justify-center items-center gap-4">
            <Progress value={percentage} className="w-full"/>
            <span className="text-sm font-semibold">{Math.round(percentage)}%</span>
        </div>
        <Button onClick={handleRetry}><RotateCcw className="mr-2 h-4 w-4" /> Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {quiz.length}
        </p>
        <h4 className="text-lg font-semibold">{currentQuestion.question}</h4>
      </div>

      <RadioGroup
        value={selectedAnswer ?? undefined}
        onValueChange={setSelectedAnswer}
        disabled={isAnswered}
        className="space-y-2"
      >
        {currentQuestion.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-md border has-[:checked]:border-primary transition-all">
            <RadioGroupItem value={option} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
          </div>
        ))}
      </RadioGroup>

      {isAnswered && (
        <Alert variant={isCorrect ? "default" : "destructive"}>
          {isCorrect ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <XCircle className="h-4 w-4" />}
          <AlertTitle>{isCorrect ? "Correct!" : "Not quite..."}</AlertTitle>
          <AlertDescription>{currentQuestion.explanation}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        {isAnswered ? (
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < quiz.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        ) : (
          <Button onClick={handleCheckAnswer} disabled={!selectedAnswer}>
            Check Answer
          </Button>
        )}
      </div>
    </div>
  );
}
