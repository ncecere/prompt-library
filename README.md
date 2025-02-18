# Prompt Library

A modern web application for managing and organizing AI prompts, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📝 Browse and search through a collection of prompts
- 🌓 Light/dark mode with system preference support
- 🔍 Full-text search functionality
- 📱 Responsive design
- 🎨 Clean and modern UI with Tailwind CSS
- 🚀 Fast page loads with Next.js App Router

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ncecere/prompt-library.git
cd prompt-library
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
prompt-library/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── lib/          # Utility functions and API
│   └── scripts/      # Helper scripts
├── prompts/          # Markdown prompt files
└── public/          # Static files
```

## Adding Prompts

Prompts are stored as Markdown files in the `prompts/` directory. Each prompt file should include frontmatter with metadata:

```markdown
---
id: 1
name: "Example Prompt"
description: "A brief description of the prompt"
tags: ["example", "demo"]
---

Your prompt content here...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
