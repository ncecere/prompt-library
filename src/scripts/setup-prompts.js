const fs = require("fs")
const path = require("path")

const promptsDirectory = path.join(process.cwd(), "prompts")

// Ensure the prompts directory exists
if (!fs.existsSync(promptsDirectory)) {
  console.log("Creating prompts directory...")
  fs.mkdirSync(promptsDirectory)
  console.log("Prompts directory created successfully.")
} else {
  console.log("Prompts directory already exists.")
}

// Sample prompts
const samplePrompts = [
  {
    filename: "1.md",
    content: `---
name: "Sample Prompt 1"
description: "This is a sample prompt"
tags: ["sample", "test"]
---

This is the content of sample prompt 1.`,
  },
  {
    filename: "2.md",
    content: `---
name: "Sample Prompt 2"
description: "This is another sample prompt"
tags: ["sample", "example"]
---

This is the content of sample prompt 2.`,
  },
]

// Create sample prompts if the directory is empty
const files = fs.readdirSync(promptsDirectory)
if (files.length === 0) {
  console.log("No prompts found. Creating sample prompts...")
  samplePrompts.forEach((prompt) => {
    const filePath = path.join(promptsDirectory, prompt.filename)
    fs.writeFileSync(filePath, prompt.content)
    console.log(`Created sample prompt: ${prompt.filename}`)
  })
} else {
  console.log(`Found ${files.length} files in the prompts directory.`)
}

console.log("Setup complete.")

