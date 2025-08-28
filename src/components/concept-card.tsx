import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { Concept } from "@/lib/types";

type ConceptCardProps = {
  concept: Omit<Concept, 'longDescription' | 'codeSnippet' | 'interactiveExample' | 'quiz'>;
};

export function ConceptCard({ concept }: ConceptCardProps) {
  const Icon = concept.icon;
  return (
    <Link href={`/concepts/${concept.slug}`} className="group block h-full">
      <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{concept.title}</CardTitle>
                <CardDescription className="mt-1">{concept.description}</CardDescription>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary shrink-0 ml-2" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
