import { ConceptCard } from "@/components/concept-card";
import { concepts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
          Master the Art of Web Development
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          From basic building blocks to advanced concepts, start your coding
          journey with our interactive lessons and AI-powered tools.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/#concepts">Start Learning</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/debugger">Try AI Debugger</Link>
          </Button>
        </div>
      </section>

      <section id="concepts" className="mt-16 md:mt-24">
        <h2 className="text-3xl font-bold text-center font-headline">
          Core Concepts
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {concepts.map((concept) => (
            <ConceptCard key={concept.slug} concept={concept} />
          ))}
        </div>
      </section>
    </div>
  );
}
