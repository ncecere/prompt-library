import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const promptsDirectory = path.join(process.cwd(), "prompts")

const samplePrompts = [
  {
    id: 1,
    name: "Code Refactoring",
    description: "A prompt to guide developers in refactoring code.",
    tags: ["coding", "refactoring"],
    content: `Refactor the given code snippet to improve its readability and efficiency without changing its functionality. Consider applying SOLID principles, reducing complexity, and improving variable naming. Explain your refactoring decisions and how they enhance the code's maintainability.`,
  },
  {
    id: 2,
    name: "Creative Writing",
    description: "A prompt to help with creative writing tasks.",
    tags: ["writing", "creative"],
    content: `Write a creative piece based on the following theme or prompt. Focus on developing engaging characters, vivid descriptions, and a compelling narrative arc. Consider the tone, pacing, and emotional impact of your writing.`,
  },
  {
    id: 3,
    name: "Marketing Strategy",
    description: "A prompt for developing marketing strategies.",
    tags: ["marketing", "business"],
    content: `Develop a comprehensive marketing strategy for the given product or service. Include target audience analysis, unique value proposition, marketing channels, content strategy, and key performance indicators. Consider both short-term and long-term objectives.`,
  },
]

samplePrompts.forEach((prompt) => {
  const filePath = path.join(promptsDirectory, `${prompt.id}.md`)
  const fileContent = `---
id: ${prompt.id}
name: "${prompt.name}"
description: "${prompt.description}"
tags: [${prompt.tags.map((tag) => `"${tag}"`).join(", ")}]
---

${prompt.content}`

  fs.writeFileSync(filePath, fileContent)
  console.log(`Created sample prompt: ${filePath}`)
})
