# Multi-stage build for the Zare Next.js app.
#
# Secrets are NEVER baked in here. Provide them at run time via
# docker-compose environment / env_file. Anything passed with --build-arg or
# ENV lands in the image history and is readable by anyone who pulls it.

# ---------- deps ----------
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---------- build ----------
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public build-time values only. NEXT_PUBLIC_* is inlined into the client
# bundle by design, so nothing secret may go here.
ARG NEXT_PUBLIC_API_URL=https://landing.zareinnovations.com
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# ---------- runtime ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# `output: 'standalone'` emits a self-contained server with only the modules
# it actually uses, so node_modules is not copied into the runtime image.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
