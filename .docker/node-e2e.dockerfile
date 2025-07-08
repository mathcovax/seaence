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
