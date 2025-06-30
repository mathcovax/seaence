FROM node:22.15.0-alpine3.21

RUN apk add --no-cache \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  chromium \
  udev \
  dumb-init \
  bash \
  curl \
  coreutils

ENV PLAYWRIGHT_VERSION=1.53.1

RUN npm i -g playwright@$PLAYWRIGHT_VERSION

ENV PLAYWRIGHT_BROWSERS_PATH=/usr/lib/chromium
