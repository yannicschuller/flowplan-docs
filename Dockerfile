# syntax=docker/dockerfile:1
FROM node:26-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# npm's download cache survives between builds (BuildKit cache mount).
RUN --mount=type=cache,target=/root/.npm npm ci
FROM deps AS build
COPY . .
RUN chmod -R a+rX /app
ENV NEXT_TELEMETRY_DISABLED=1
# The type check already runs in CI; image builds there skip it.
ARG FLOWPLAN_SKIP_TYPECHECK=""
# Next's build cache survives between builds as well.
RUN --mount=type=cache,target=/app/.next/cache npm run build
FROM node:26-bookworm-slim AS runtime
LABEL org.opencontainers.image.title="flowplan-docs" \
  org.opencontainers.image.source="https://github.com/yannicschuller/flowplan-docs" \
  org.opencontainers.image.licenses="AGPL-3.0-only"
# curl for Coolify's HTTP healthcheck, which runs inside the container.
RUN apt-get update && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
