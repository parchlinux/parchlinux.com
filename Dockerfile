# Stage 1: Build application using Bun for fast package install & build
FROM oven/bun:alpine AS base
WORKDIR /app

# Install dependencies based on lockfile
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy application source and build standalone output
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# Stage 2: Production runner with Node.js 22 LTS (Official Next.js standalone runtime)
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Guardrail to keep V8 heap memory bounded and prevent runaway memory usage
ENV NODE_OPTIONS="--max-old-space-size=768"

# Create non-root system user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build and static assets
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/public ./public
COPY --from=base /app/.next/static ./.next/static

# Guarantee server.js and its dependencies are at /app root and owned by nextjs
RUN if [ ! -f /app/server.js ] && [ -f /app/app/server.js ]; then \
      cp -r /app/app/* /app/ && rm -rf /app/app; \
    fi && \
    chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]