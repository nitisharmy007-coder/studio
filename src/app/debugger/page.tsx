import { AiDebugger } from "@/components/ai-debugger";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Code Debugger",
  description: "Get help from our AI assistant to find and fix bugs in your code.",
};

export default function DebuggerPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">AI Code Debugger</h1>
        <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
          Stuck on a bug? Paste your code below, select the language, and our AI assistant will help you figure it out.
        </p>
      </header>
      <AiDebugger />
    </div>
  );
}
