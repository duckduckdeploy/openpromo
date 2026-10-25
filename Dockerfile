# One image for the whole stack: the API (with MCP, the background worker and the renderer), the
# dashboard and the public site. docker-compose.yml runs it three times with different commands.
#
#   docker compose up -d --build
#
# Build arguments are baked into the two Next.js apps, so changing them needs a rebuild.

FROM node:26-bookworm-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH NEXT_TELEMETRY_DISABLED=1 \
    # Chrome is installed once, below, into a shared folder; npm installs must not fetch their own.
    PUPPETEER_SKIP_DOWNLOAD=true PUPPETEER_CACHE_DIR=/opt/puppeteer
# Node 26 no longer ships corepack, so pnpm comes from npm.
RUN npm install -g pnpm@10.30.3
WORKDIR /openpromo

# ── Dependencies, cached until a package.json or the lockfile changes ────────
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/
COPY apps/app/package.json apps/app/
COPY apps/web/package.json apps/web/
COPY packages/render/package.json packages/render/
COPY packages/shared/package.json packages/shared/
COPY packages/yepapi/package.json packages/yepapi/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# ── Build the dashboard and the site ─────────────────────────────────────────
FROM deps AS build
# Where the two Next.js apps forward /api to: the api service inside compose.
ARG API_URL=http://api:4100
# Public addresses, used for links, canonical URLs and the sitemap.
ARG NEXT_PUBLIC_APP_URL=http://localhost:3200
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3101
ARG NEXT_PUBLIC_API_URL=http://localhost:4100
ARG NEXT_PUBLIC_GITHUB_URL=
ENV API_URL=$API_URL \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL
COPY . .
RUN pnpm --filter @openpromo/app build && pnpm --filter @openpromo/web build

# ── Runtime ──────────────────────────────────────────────────────────────────
FROM base AS runtime
ENV NODE_ENV=production
# The renderer needs a browser, ffmpeg (with ffprobe) and fonts for every script and emoji.
# Debian's chromium brings the system libraries; the frame-exact capture uses Chrome's
# headless shell, fetched by Puppeteer into PUPPETEER_CACHE_DIR.
RUN apt-get update \
  && apt-get install -y --no-install-recommends chromium ffmpeg unzip ca-certificates fonts-noto-core fonts-noto-cjk fonts-noto-color-emoji fonts-liberation fontconfig \
  && rm -rf /var/lib/apt/lists/*
COPY --from=build --chown=node:node /openpromo /openpromo
RUN cd /openpromo/apps/api \
  && PUPPETEER_SKIP_DOWNLOAD= node_modules/.bin/puppeteer browsers install chrome-headless-shell \
  && ln -s "$(find /opt/puppeteer/chrome-headless-shell -name chrome-headless-shell -type f | head -1)" /usr/local/bin/chrome-headless-shell \
  && chmod -R a+rX /opt/puppeteer \
  && mkdir -p /data/media && chown node:node /data/media
ENV CHROME_PATH=/usr/local/bin/chrome-headless-shell \
    PRODUCER_HEADLESS_SHELL_PATH=/usr/local/bin/chrome-headless-shell \
    FFMPEG_PATH=/usr/bin/ffmpeg \
    MEDIA_DIR=/data/media
USER node
EXPOSE 4100 3200 3101
# The API by default: apply database migrations, then start. Compose overrides this for the
# dashboard and the site.
WORKDIR /openpromo/apps/api
CMD ["sh", "-c", "node_modules/.bin/tsx src/db/migrate.ts && exec node_modules/.bin/tsx src/server.ts"]
