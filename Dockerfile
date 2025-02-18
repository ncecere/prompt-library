# Build stage
FROM --platform=$BUILDPLATFORM oven/bun:1 AS builder
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN bun install --verbose
RUN bun add critters
RUN bun add wrap-ansi-cjs@7.0.0
RUN bun add string-width-cjs@4.2.3

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_LINT_DURING_BUILD=false

# Build the application
RUN bun run build

# Production stage
FROM --platform=$TARGETPLATFORM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create prompts directory that will be used as a volume
RUN mkdir -p /app/prompts

# Copy necessary files from the builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port the app runs on
EXPOSE 3000

# Set the volume for prompts
VOLUME ["/app/prompts"]

# Command to run the application
CMD ["bun", "server.js"]
