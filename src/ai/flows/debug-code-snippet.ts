'use server';

/**
 * @fileOverview AI debugging tool for user-created code snippets.
 *
 * - debugCodeSnippet - A function that handles debugging code snippets.
 * - DebugCodeSnippetInput - The input type for the debugCodeSnippet function.
 * - DebugCodeSnippetOutput - The return type for the debugCodeSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DebugCodeSnippetInputSchema = z.object({
  codeSnippet: z
    .string()
    .describe('The code snippet to debug.'),
  programmingLanguage: z.string().describe('The programming language of the code snippet.'),
});
export type DebugCodeSnippetInput = z.infer<typeof DebugCodeSnippetInputSchema>;

const DebugCodeSnippetOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the errors in the code and how to fix them.'),
});
export type DebugCodeSnippetOutput = z.infer<typeof DebugCodeSnippetOutputSchema>;

export async function debugCodeSnippet(input: DebugCodeSnippetInput): Promise<DebugCodeSnippetOutput> {
  return debugCodeSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'debugCodeSnippetPrompt',
  input: {schema: DebugCodeSnippetInputSchema},
  output: {schema: DebugCodeSnippetOutputSchema},
  prompt: `You are an expert programming tutor, skilled at debugging code and explaining errors to beginners.

You will receive a code snippet and the programming language it is written in. You will identify any errors in the code, explain what the errors are, and suggest how to fix them. Focus on helping the user understand the errors so they can learn from their mistakes.

Programming Language: {{{programmingLanguage}}}
Code Snippet:
\`\`\`{{{programmingLanguage}}}
{{{codeSnippet}}}
\`\`\`
`,
});

const debugCodeSnippetFlow = ai.defineFlow(
  {
    name: 'debugCodeSnippetFlow',
    inputSchema: DebugCodeSnippetInputSchema,
    outputSchema: DebugCodeSnippetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
