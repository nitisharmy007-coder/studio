"use server";

import { z } from "zod";
import { debugCodeSnippet, type DebugCodeSnippetOutput } from "@/ai/flows/debug-code-snippet";

const schema = z.object({
  codeSnippet: z.string().min(10, { message: "Code snippet must be at least 10 characters." }),
  programmingLanguage: z.string({ required_error: "Please select a programming language." }),
});

export type FormState = {
  message: string;
  data?: DebugCodeSnippetOutput;
  errors?: {
    codeSnippet?: string[];
    programmingLanguage?: string[];
    _form?: string[];
  };
};

export async function handleDebug(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    codeSnippet: formData.get("codeSnippet"),
    programmingLanguage: formData.get("programmingLanguage"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await debugCodeSnippet(validatedFields.data);
    return { message: "Success", data: result };
  } catch (error) {
    console.error(error);
    return { message: "An unexpected error occurred. Please try again later." };
  }
}
