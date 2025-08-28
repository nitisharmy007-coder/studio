"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleDebug, type FormState } from "@/app/debugger/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Bot, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Debugging...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Debug Code
        </>
      )}
    </Button>
  );
}

export function AiDebugger() {
  const [state, formAction] = useFormState<FormState, FormData>(handleDebug, { message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "Success") {
      // formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="codeSnippet" className="block text-sm font-medium mb-1">Code Snippet</Label>
          <Textarea
            id="codeSnippet"
            name="codeSnippet"
            placeholder="Paste your code here..."
            className="font-code min-h-[300px]"
            required
          />
          {state.errors?.codeSnippet && (
            <p className="text-sm font-medium text-destructive mt-1">{state.errors.codeSnippet[0]}</p>
          )}
        </div>
        <div>
           <Label htmlFor="programmingLanguage" className="block text-sm font-medium mb-1">Language</Label>
           <Select name="programmingLanguage" defaultValue="javascript">
            <SelectTrigger id="programmingLanguage">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>
          {state.errors?.programmingLanguage && (
            <p className="text-sm font-medium text-destructive mt-1">{state.errors.programmingLanguage[0]}</p>
          )}
        </div>
        <SubmitButton />
        {state.message && state.message !== 'Success' && (
             <p className="text-sm font-medium text-destructive mt-1">{state.message}</p>
        )}
      </form>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center"><Bot className="mr-2 h-5 w-5"/> AI Explanation</h3>
        <Card className="min-h-[calc(300px+7rem)]">
          <CardContent className="p-6 h-full">
            {state.data ? (
              <div
                className="text-sm leading-relaxed whitespace-pre-wrap font-sans h-full overflow-y-auto"
              >
                {state.data.explanation}
              </div>
            ) : (
               <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Sparkles className="h-8 w-8 mb-2"/>
                <p>The AI's feedback will appear here once you submit your code.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
