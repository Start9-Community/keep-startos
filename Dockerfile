# Build the keep-web binary. Default features only: wss-only relays, no
# allow-ws / allow-internal (those are test-only and must never ship).
FROM rust:1.89-bookworm@sha256:948f9b08a66e7fe01b03a98ef1c7568292e07ec2e4fe90d88c07bb14563c84ff AS rust-builder
WORKDIR /build
COPY keep/ ./
RUN cargo build --release -p keep-web

# Build the admin SPA (Vite + Svelte) into /ui/dist.
FROM node:20-bookworm-slim@sha256:2cf067cfed83d5ea958367df9f966191a942351a2df77d6f0193e162b5febfc0 AS ui-builder
WORKDIR /ui
COPY keep/keep-web/ui/ ./
RUN npm ci && npm run build

FROM debian:bookworm-slim@sha256:4724b8cc51e33e398f0e2e15e18d5ec2851ff0c2280647e1310bc1642182655d
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
