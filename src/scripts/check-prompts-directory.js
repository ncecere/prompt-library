import fs from "fs"
import path from "path"

const promptsDirectory = path.join(process.cwd(), "prompts")

if (!fs.existsSync(promptsDirectory)) {
  console.log("Creating prompts directory...")
  fs.mkdirSync(promptsDirectory)
  console.log("Prompts directory created successfully.")
} else {
  console.log("Prompts directory already exists.")
}

// Check if there are any .md files in the prompts directory
const files = fs.readdirSync(promptsDirectory)
const mdFiles = files.filter((file) => path.extname(file) === ".md")

if (mdFiles.length === 0) {
  console.log("No .md files found in the prompts directory.")
  console.log("Please add some .md files to the prompts directory before running the application.")
} else {
  console.log(`Found ${mdFiles.length} .md files in the prompts directory.`)
}
