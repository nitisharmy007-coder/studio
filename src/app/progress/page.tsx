"use client";

import { useProgress } from "@/hooks/use-progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { concepts } from "@/lib/data";
import { CheckCircle2, Circle, Target, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

export default function ProgressPage() {
  const { progress, resetProgress } = useProgress();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  const totalConcepts = concepts.length;
  const completedConceptsCount = progress.completedConcepts.length;
  const overallProgress = totalConcepts > 0 ? (completedConceptsCount / totalConcepts) * 100 : 0;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold font-headline">Your Progress</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Track your journey to becoming a web developer.
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="mx-auto md:mx-0">
              <Trash2 className="mr-2 h-4 w-4" />
              Reset Progress
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all your progress data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={resetProgress}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overall Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="font-bold text-2xl">{Math.round(overallProgress)}%</span>
            <ProgressBar value={overallProgress} className="w-full" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            You have completed {completedConceptsCount} of {totalConcepts} concepts.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target /> Concepts Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {concepts.map((concept) => (
                <li key={concept.slug} className="flex items-center justify-between">
                  <Link href={`/concepts/${concept.slug}`} className="flex items-center gap-3 group">
                    {progress.completedConcepts.includes(concept.slug) ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="font-medium group-hover:text-primary transition-colors">{concept.title}</span>
                  </Link>
                   {progress.completedConcepts.includes(concept.slug) && (
                     <span className="text-sm font-semibold text-primary">Completed</span>
                   )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quiz Scores</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(progress.quizScores).length > 0 ? (
              <ul className="space-y-4">
              {Object.entries(progress.quizScores).map(([slug, data]) => {
                const concept = concepts.find(c => c.slug === slug);
                const percentage = (data.score / data.total) * 100;
                return (
                  <li key={slug}>
                    <p className="font-medium">{concept?.title || slug}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <ProgressBar value={percentage} className="w-full" />
                      <span className="text-sm font-semibold w-24 text-right">{data.score}/{data.total}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No quiz scores yet. Complete a quiz to see your results!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
