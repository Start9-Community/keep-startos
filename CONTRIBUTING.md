# Contributing

## Keep these in sync

- **[`README.md`](./README.md)** — what this package is and how it's built (image, volumes, interfaces, CI). Technical reference for developers and AI assistants.
- **[`instructions.md`](./instructions.md)** — the user-facing instructions packed into the `.s9pk` and shown on the **Instructions** tab in StartOS, for the person running the service.

Any code change that affects user-visible behavior must update `README.md` and `instructions.md` in the same change. Content rules: [Writing READMEs](https://docs.start9.com/packaging/writing-readmes.html), [Writing Instructions](https://docs.start9.com/packaging/writing-instructions.html).

## Environment setup

See [Environment Setup](https://docs.start9.com/packaging/environment-setup.html). You need `start-cli` (the StartOS SDK), Node.js/npm, and Docker.

## Building

```bash
git clone --recurse-submodules https://github.com/privkeyio/keep-startos
cd keep-startos
npm ci          # install the TypeScript SDK
make x86        # build keep_x86_64.s9pk (x86_64 only — see Makefile / manifest)
make install    # sideload to the host in ~/.startos/config.yaml
```

The `keep/` submodule is the upstream source; the root `Dockerfile` compiles `keep-web` (Rust, release, wss-only) and builds the Svelte SPA from it. See [Makefile options](https://docs.start9.com/packaging/makefile.html).

## Updating the upstream version

See [UPDATING.md](./UPDATING.md) to bump the `keep` submodule, then update `version` and `releaseNotes` in the file under `startos/versions/`, renaming it to the new version string (a new version file is only needed for a migration or to preserve old release notes — see [Versions](https://docs.start9.com/packaging/versions.html)).

## CI/CD

Two workflows under `.github/workflows/` wrap reusable workflows in [`start9labs/shared-workflows`](https://github.com/Start9Labs/shared-workflows):

- **`build.yml`** — on PR to `main` and manual dispatch, builds the `.s9pk` to verify it packs. Requires repo secret `DEV_KEY` (a StartOS developer key from `start-cli init-key`).
- **`release.yml`** — on a `v*.*` tag, builds and publishes. Requires `DEV_KEY` plus registry/S3 vars (`RELEASE_REGISTRY`, `S3_S9PKS_BASE_URL`) and secrets (`S3_ACCESS_KEY`, `S3_SECRET_KEY`) when publishing to your own registry.

### Cutting a release

1. Update `startos/versions/` (version + release notes) and bump the `keep` submodule if needed.
2. `git tag v0.3.0 && git push --tags` → `release.yml` builds and publishes.

## How to contribute

1. Fork and create a branch from `main`.
2. Make your changes, including the doc updates above.
3. Open a pull request to `main`.
