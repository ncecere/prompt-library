# Build stage
FROM --platform=$BUILDPLATFORM oven/bun:1 AS bun-builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN bun install --verbose
RUN bun add critters

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_LINT_DURING_BUILD=false

# Build the application
RUN bun run build

# Node.js build stage for ARM64
FROM --platform=$BUILDPLATFORM node:18-alpine AS node-builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_LINT_DURING_BUILD=false

# Build the application
RUN npm run build

# Production stage
FROM --platform=$TARGETPLATFORM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create prompts directory that will be used as a volume
RUN mkdir -p /app/prompts

# Copy necessary files from the appropriate builder
COPY --from=bun-builder /app/public ./public
COPY --from=bun-builder /app/.next/standalone ./
COPY --from=bun-builder /app/.next/static ./.next/static
COPY --from=node-builder /app/public ./public
COPY --from=node-builder /app/.next/standalone ./
COPY --from=node-builder /app/.next/static ./.next/static

# Expose the port the app runs on
EXPOSE 3000

# Set the volume for prompts
VOLUME ["/app/prompts"]

# Command to run the application
CMD ["node", "server.js"]
