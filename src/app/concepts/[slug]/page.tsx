import { concepts } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Code, Brain, Play } from "lucide-react";
import { InteractiveEditor } from "@/components/interactive-editor";
import { Quiz } from "@/components/quiz";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const concept = concepts.find((c) => c.slug === params.slug);
  if (!concept) {
    return { title: "Concept Not Found" };
  }
  return {
    title: concept.title,
    description: `Learn about ${concept.title}. ${concept.description}`,
  };
}

export async function generateStaticParams() {
  return concepts.map((concept) => ({
    slug: concept.slug,
  }));
}

export default function ConceptPage({ params }: Props) {
  const concept = concepts.find((c) => c.slug === params.slug);

  if (!concept) {
    notFound();
  }

  const Icon = concept.icon;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <header className="mb-12">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold font-headline">{concept.title}</h1>
        </div>
        <p className="mt-2 text-lg text-muted-foreground">{concept.longDescription}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-8">
          {concept.interactiveExample && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-headline">
                  <Play /> Interactive Example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InteractiveEditor initialCode={concept.interactiveExample.initialCode} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-headline">
                <Code /> Code Snippet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted p-4 font-code text-sm overflow-x-auto">
                <pre><code>{concept.codeSnippet.code}</code></pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-headline">
                <Brain /> Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Quiz quiz={concept.quiz} conceptSlug={concept.slug} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
