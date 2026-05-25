# keep-startos

StartOS package for [Keep](https://github.com/privkeyio/keep) — an always-on FROST threshold co-signer for Nostr and Bitcoin.

The server holds one share of a multi-device FROST key and coordinates with your other devices over Nostr relays to produce signatures, so no single device ever holds the whole key. It exposes a NIP-46 bunker for Nostr clients and a web admin UI for importing your share and watching signing activity.

Built on the [`keep-web`](https://github.com/privkeyio/keep/tree/main/keep-web) daemon (Rust axum API + embedded FROST node + Svelte admin SPA).

## Building

This package targets **StartOS 0.4.x** and uses the StartOS TypeScript SDK.

```sh
git clone --recurse-submodules https://github.com/privkeyio/keep-startos
cd keep-startos
make            # produces keep.s9pk
make install    # installs to the host in ~/.startos/config.yaml
```

The `keep` git submodule pins the upstream source built into the image (`Dockerfile` builds `keep-web` + the SPA).

## Structure

- `startos/` — package definition (manifest, main daemon, interfaces, config store, actions, i18n).
- `Dockerfile` — multi-stage build: Rust (`keep-web`, release, wss-only) + Node (SPA) → slim runtime image.
- `keep/` — upstream source as a git submodule.

See [`docs/instructions.md`](docs/instructions.md) for setup and usage.
