# Build the keep-web binary. Default features only: wss-only relays, no
# allow-ws / allow-internal (those are test-only and must never ship).
FROM rust:1.89-bookworm AS rust-builder
WORKDIR /build
COPY keep/ ./
RUN cargo build --release -p keep-web

# Build the admin SPA (Vite + Svelte) into /ui/dist.
FROM node:20-bookworm-slim AS ui-builder
WORKDIR /ui
COPY keep/keep-web/ui/ ./
RUN npm ci && npm run build

FROM debian:bookworm-slim
RUN apt-get update \
    && apt-get install -y ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=rust-builder /build/target/release/keep-web /app/keep-web
COPY --from=ui-builder /ui/dist /app/ui

WORKDIR /app
EXPOSE 8080

# All runtime config is injected as env by startos/main.ts; these are only
# fallbacks for running the image directly.
ENV KEEP_PATH=/data/vault
ENV KEEP_WEB_LISTEN=0.0.0.0:8080
ENV KEEP_WEB_UI_DIR=/app/ui
