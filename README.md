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

### Using Docker (Recommended)

The easiest way to run Prompt Library is using Docker:

```bash
# Pull the latest image
docker pull ghcr.io/ncecere/prompt-library:latest

# Run the container with a volume for prompts
docker run -d \
  -p 3000:3000 \
  -v /path/to/your/prompts:/app/prompts \
  ghcr.io/ncecere/prompt-library:latest
```

Replace `/path/to/your/prompts` with the path to your local prompts directory.

### Local Development

Prerequisites:
- Bun 1.0 or later (Install from https://bun.sh)

1. Clone the repository:
```bash
git clone https://github.com/ncecere/prompt-library.git
cd prompt-library
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker Build (Local)

To build the Docker image locally:

```bash
docker build -t prompt-library .
docker run -d -p 3000:3000 -v /path/to/your/prompts:/app/prompts prompt-library
```

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
