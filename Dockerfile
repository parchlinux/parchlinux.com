FROM oven/bun:alpine AS base 

WORKDIR /app
ADD package.json .
ADD bun.lock .
RUN bun i
ADD . .
RUN bun run build
FROM oven/bun:alpine AS production
WORKDIR /app
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static .
CMD [ "bun","--bun","server.js" ]
