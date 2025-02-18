# Build and run stage
FROM --platform=$TARGETPLATFORM oven/bun:1 AS runner
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN bun install --verbose
RUN bun add critters

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_LINT_DURING_BUILD=false
ENV NODE_ENV=production

# Create prompts directory that will be used as a volume
RUN mkdir -p /app/prompts

# Expose the port the app runs on
EXPOSE 3000

# Set the volume for prompts
VOLUME ["/app/prompts"]

# Command to run the build process and start the application
CMD bun run build && bun run start
