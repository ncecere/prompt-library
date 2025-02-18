# Build stage
FROM oven/bun:1 AS builder
WORKDIR /app

# Debug: Print Bun version
RUN bun --version

# Copy package files
COPY package.json ./
#COPY bun.lockb ./

# Debug: List contents of the directory
RUN ls -la

# Install dependencies
RUN bun install --verbose
RUN bun add critters

# Debug: List installed packages
RUN bun pm ls

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_LINT_DURING_BUILD=false

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create prompts directory that will be used as a volume
RUN mkdir -p /app/prompts

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port the app runs on
EXPOSE 3000

# Set the volume for prompts
VOLUME ["/app/prompts"]

# Command to run the application
CMD ["bun", "server.js"]
