# Contributing to Prompt Library

Thank you for your interest in contributing to Prompt Library! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/prompt-library.git
cd prompt-library
```
3. Install dependencies:
```bash
npm install
```
4. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

## Adding New Prompts

1. Create a new markdown file in the `prompts/` directory
2. Include the required frontmatter:
```markdown
---
id: <unique-number>
name: "Your Prompt Name"
description: "A brief description"
tags: ["relevant", "tags"]
---

Your prompt content here...
```
3. Ensure your prompt follows these guidelines:
   - Clear and concise description
   - Relevant tags
   - Well-formatted content
   - Unique ID number

## Development Guidelines

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## Pull Request Process

1. Update the README.md if needed
2. Ensure your code follows our style guidelines
3. Test your changes locally
4. Create a Pull Request with a clear description
5. Reference any related issues

## Code Style

- Use 2 spaces for indentation
- Follow TypeScript best practices
- Use meaningful variable and function names
- Add type annotations where helpful
- Keep functions small and focused

## Commit Messages

Follow the conventional commits specification:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance tasks

## Questions or Problems?

Feel free to:
- Open an issue
- Ask for clarification in a PR
- Reach out to maintainers

Thank you for contributing!
