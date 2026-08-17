#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRANCH="${DEPLOY_BRANCH:-dev}"
APP_NAME="${PM2_APP_NAME:-zare-website}"

cd "$APP_DIR"

echo "==> Pulling latest ${BRANCH}"
git fetch origin
git checkout "$BRANCH"
git reset --hard "origin/${BRANCH}"

echo "==> Installing dependencies"
pnpm install --frozen-lockfile

echo "==> Building"
pnpm build

echo "==> Restarting app"
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  pm2 restart "$APP_NAME" --update-env
else
  pm2 start pnpm --name "$APP_NAME" -- start
  pm2 save
fi

echo "==> Deploy complete"
pm2 status "$APP_NAME"
