import { FileText, Code, Paintbrush } from "lucide-react";
import type { Concept } from "@/lib/types";

export const concepts: Concept[] = [
  {
    slug: "html-basics",
    title: "HTML Basics",
    description: "Learn the fundamental building blocks of the web.",
    longDescription: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It forms the very foundation of your website's content and structure.",
    icon: FileText,
    codeSnippet: {
      language: "html",
      code: `<!DOCTYPE html>
<html>
<head>
  <title>My First Web Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a paragraph.</p>
</body>
</html>`
    },
    interactiveExample: {
      initialCode: `<h1>Welcome to LearnWeb!</h1>
<p>You can edit this code and see the result live.</p>
<button style="padding: 8px 16px; border-radius: 4px; background-color: #00BCD4; color: white; border: none;">Click me!</button>
`
    },
    quiz: [
      {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"],
        correctAnswer: "HyperText Markup Language",
        explanation: "HTML stands for HyperText Markup Language. It's the standard for creating web pages."
      },
      {
        question: "Which HTML element is used to define the title of a document?",
        options: ["<head>", "<title>", "<header>", "<meta>"],
        correctAnswer: "<title>",
        explanation: "The <title> element, found within the <head> section, defines the title that appears in the browser tab."
      }
    ]
  },
  {
    slug: "css-basics",
    title: "CSS Basics",
    description: "Style your web pages and bring your designs to life.",
    longDescription: "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.",
    icon: Paintbrush,
    codeSnippet: {
      language: "css",
      code: `body {
  font-family: sans-serif;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
  text-align: center;
}`
    },
    interactiveExample: {
      initialCode: `<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: #00BCD4; /* Electric Blue! */
    border-radius: 8px;
    /* Try changing the background-color to #673AB7 */
  }
</style>
<div class="box"></div>`
    },
    quiz: [
      {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correctAnswer: "Cascading Style Sheets",
        explanation: "CSS stands for Cascading Style Sheets, used to style and layout web pages."
      },
      {
        question: "Which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "background"],
        correctAnswer: "background-color",
        explanation: "The `background-color` property is used to set the background color of an element."
      }
    ]
  },
  {
    slug: "javascript-basics",
    title: "JavaScript Basics",
    description: "Add interactivity and logic to your websites.",
    longDescription: "JavaScript is a programming language that enables you to create dynamically updating content, control multimedia, animate images, and pretty much everything else. It's the 'logic' part of a website.",
    icon: Code,
    codeSnippet: {
      language: "javascript",
      code: `function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");`
    },
    interactiveExample: {
      initialCode: `<div id="output"></div>
<button id="myButton">Click me</button>

<script>
  const button = document.getElementById('myButton');
  const output = document.getElementById('output');
  let count = 0;
  
  button.addEventListener('click', () => {
    count++;
    output.innerHTML = 'Button clicked ' + count + ' times.';
    // Try changing the text!
  });
</script>`
    },
    quiz: [
      {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<script>", "<javascript>", "<js>", "<scripting>"],
        correctAnswer: "<script>",
        explanation: "JavaScript code is placed inside <script> tags."
      },
      {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        correctAnswer: "alert('Hello World');",
        explanation: "The `alert()` function is used to display a simple alert box with a message."
      }
    ]
  }
];
