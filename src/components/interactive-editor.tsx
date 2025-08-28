"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InteractiveEditorProps {
  initialCode: string;
}

export function InteractiveEditor({ initialCode }: InteractiveEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [renderedCode, setRenderedCode] = useState(initialCode);

  const handleRun = () => {
    setRenderedCode(code);
  };
  
  const handleReset = () => {
    setCode(initialCode);
    setRenderedCode(initialCode);
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-64 w-full font-code text-sm"
          placeholder="Enter your code here..."
        />
        <div className="absolute bottom-2 right-2 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Reset Code</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset Code</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" onClick={handleRun}>
                  <Play className="h-4 w-4" />
                  <span className="sr-only">Run Code</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Run Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Result:</p>
        <div className="h-64 w-full rounded-md border bg-white">
          <iframe
            srcDoc={renderedCode}
            title="Interactive Code Output"
            sandbox="allow-scripts"
            className="h-full w-full"
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
}
