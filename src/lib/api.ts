import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { Prompt } from "./types"

const promptsDirectory = path.join(process.cwd(), "prompts")

// Ensure the prompts directory exists
if (!fs.existsSync(promptsDirectory)) {
  fs.mkdirSync(promptsDirectory, { recursive: true })
  console.log(`Created prompts directory at: ${promptsDirectory}`)
}

export function createSamplePrompts() {
  const samplePrompts = [
    {
      id: 1,
      name: "Sample Prompt 1",
      description: "This is the first sample prompt",
      tags: ["sample", "example"],
      content: "This is the content of sample prompt 1.",
    },
    {
      id: 2,
      name: "Sample Prompt 2",
      description: "This is the second sample prompt",
      tags: ["sample", "test"],
      content: "This is the content of sample prompt 2.",
    },
  ]

  samplePrompts.forEach((prompt) => {
    const filePath = path.join(promptsDirectory, `prompt-${prompt.id}.md`)
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
}

export function getPromptData(filePath: string): Prompt | null {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  const id = data.id?.toString() || ""

  if (!id) {
    console.error(`No id found in frontmatter: ${filePath}`)
    return null
  }

  return {
    content,
    ...(data as { id: string; name: string; description: string; tags: string[] }),
  }
}

export function getAllPromptIds() {
  if (!fs.existsSync(promptsDirectory)) {
    console.log("Prompts directory does not exist. Creating sample prompts.")
    createSamplePrompts()
  }

  const fileNames = fs.readdirSync(promptsDirectory)
  const prompts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(promptsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)
      return data.id ? { id: data.id.toString() } : null
    })
    .filter((item): item is { id: string } => item !== null)

  return prompts
}

export function getAllPrompts(): Prompt[] {
  if (!fs.existsSync(promptsDirectory)) {
    console.log("Prompts directory does not exist. Creating sample prompts.")
    createSamplePrompts()
  }

  const fileNames = fs.readdirSync(promptsDirectory)
  const allPromptsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(promptsDirectory, fileName)
      return getPromptData(fullPath)
    })
    .filter(Boolean) // Remove null values

  return allPromptsData.filter((prompt): prompt is Prompt => prompt !== null)
}

export async function getPromptContent(id: string): Promise<Prompt | null> {
  const fileNames = fs.readdirSync(promptsDirectory)
  const promptFile = fileNames.find((fileName) => {
    const fullPath = path.join(promptsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)
    return data.id?.toString() === id
  })

  if (!promptFile) {
    console.error(`No prompt found with id: ${id}`)
    return null
  }

  const fullPath = path.join(promptsDirectory, promptFile)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    contentHtml,
    content,
    ...(data as { id: string; name: string; description: string; tags: string[] }),
  }
}
