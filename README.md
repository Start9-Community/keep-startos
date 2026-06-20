<p align="center">
  <img src="icon.png" alt="Keep Logo" width="21%">
</p>

# Keep on StartOS

> **Upstream docs:** <https://github.com/privkeyio/keep>
>
> Everything not listed in this document should behave the same as upstream
> Keep. If a feature, setting, or behavior is not mentioned here, the upstream
> documentation is accurate and fully applicable.

[Keep](https://github.com/privkeyio/keep) is a self-custodial key manager for Nostr and Bitcoin. This package runs its [`keep-web`](https://github.com/privkeyio/keep/tree/main/keep-web) daemon as an always-on FROST threshold co-signer: it holds one share of a multi-device key and coordinates signatures with your other devices over Nostr relays, so no single device ever holds the whole key.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Dependencies](#dependencies)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image | `keep` — built from source via the root `Dockerfile` |
| Source | `keep` git submodule (upstream `keep-web` crate + Svelte admin SPA) |
| Build | Rust release (`keep-web`, default features = wss-only) + Vite/Svelte UI, on a slim Debian runtime |
| Architectures | x86_64 |
| Entrypoint | `/app/keep-web` |

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/data` | Encrypted vault and StartOS settings |

**Key paths on the `main` volume:**

- `/data/vault` — the encrypted Keep vault: your FROST share(s), signing state, and the persisted co-signing kill-switch flag
- `/data/start9/store.json` — StartOS persistent settings: vault password, Web Admin token, bunker/FROST relays, optional group

---

## Installation and First-Run Flow

| Step | Upstream | StartOS |
|------|----------|---------|
| Vault creation | Manual (`keep` CLI) | Auto-created at `/data/vault` on first start |
| Vault password | User-supplied | Auto-generated internal secret (never shown) |
| Web Admin login | Token logged at startup | Generated and rotated via the Set Web Admin Password action |
| Share import | CLI / app | Pasted into the Web Admin in setup mode |

**First-run steps:**

1. A critical task prompts you to run **Set Web Admin Password**; copy the generated password and sign in (username `admin`).
2. Open the **Web Admin** and import your FROST share (a `kshare1…` export from the device that created the group).
3. Restart the service so `keep-web` loads the share and starts the co-signer.
4. Flip the co-signing kill switch in the Web Admin (ships off, fail-closed).

See [instructions.md](instructions.md) for the user-facing walkthrough.

---

## Configuration Management

| StartOS-Managed | Upstream-Managed (Web Admin) |
|-----------------|------------------------------|
| Vault path, listen address, UI dir (env) | FROST share import |
| Vault password (auto-generated internal secret) | Co-signing kill switch |
| Web Admin token (Set Web Admin Password action) | Signing policy / per-request approvals |
| Bunker & FROST relays, optional group (Configure action) | Active-group selection (with shares for multiple groups) |

**Environment variables set by StartOS** (`startos/main.ts`):

| Variable | Value | Purpose |
|----------|-------|---------|
| `KEEP_PATH` | `/data/vault` | Vault location (on the backed-up `main` volume) |
| `KEEP_WEB_LISTEN` | `0.0.0.0:8080` | Web Admin bind address |
| `KEEP_WEB_UI_DIR` | `/app/ui` | Built Svelte admin SPA |
| `KEEP_PASSWORD` | (auto-generated) | Vault encryption password |
| `KEEP_WEB_AUTH_TOKEN` | (set by action) | Web Admin bearer token; omitted until set |
| `KEEP_BUNKER_RELAY` | (Configure) | NIP-46 bunker relays, comma-separated |
| `KEEP_FROST_RELAY` | (Configure) | FROST coordination relays, comma-separated |
| `KEEP_FROST_GROUP` | (Configure, optional) | Pins a specific group npub; omitted → auto-select (switch the active group in the Web Admin) |

Single-key mode (`KEEP_ALLOW_SINGLE_KEY`) and env-level auto-approve (`KEEP_FROST_AUTO_APPROVE`) are intentionally left unset — Keep runs as a fail-closed FROST co-signer.

Relays default to a single `wss://bucket.coracle.social` (upstream keep-core's default): it reliably delivers the rapid ephemeral kind-24242 events FROST coordination needs, which most general-purpose relays drop. The Configure action requires at least one relay (the bunker will not start with none) and accepts up to 10 — add more known-good relays there for redundancy.

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose |
|-----------|------|----------|---------|
| Web Admin (`ui`) | 8080 | HTTP | Admin SPA + bearer-authenticated `/api` |

The NIP-46 bunker and FROST signing are **not** bound ports: `keep-web` reaches Nostr relays over outbound WebSocket connections, and clients reach the bunker through those relays using the connection string shown in the Web Admin.

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address (if added)
- Custom domains (if configured)

---

## Actions (StartOS UI)

### Set Web Admin Password

Generate or rotate the Web Admin bearer token. On install a critical task prompts you to run it before signing in; re-run any time to rotate.

| Property | Value |
|----------|-------|
| Availability | Any status |
| Visibility | Always visible (also a critical task on install) |
| Inputs | None |
| Outputs | Username (`admin`) and the generated password |

### Configure

Set the relays and group Keep uses, then restart to apply.

| Property | Value |
|----------|-------|
| Availability | Any status |
| Visibility | Always visible |
| Inputs | Bunker Relays, FROST Relays, Group (npub, optional) |
| Outputs | Confirmation; restarts the service |

---

## Dependencies

None.

---

## Backups and Restore

**Included in backup:**

- `main` volume — the encrypted vault (`/data/vault`) and `store.json`

**Restore behavior:**

- The vault and its password are restored together, so your share, kill-switch state, relays, and Web Admin token come back as-is — no re-import or reconfiguration. Init regenerates the vault password only on a fresh install, never on restore.

---

## Health Checks

| Check | Display Name | Method | Messages |
|-------|--------------|--------|----------|
| `primary` | Web Admin | Port-listening check on 8080 | "The Keep admin UI is ready" / "The Keep admin UI is not responding" |

---

## Limitations and Differences

1. **x86_64 only** — `keep-web` is built for x86_64; there is no aarch64 or riscv64 image.
2. **Requires an existing FROST group** — this package imports shares; it does not run key generation. Create the group and export a share elsewhere (e.g. Keep Android) first.
3. **Co-signing is off by default** — fail-closed; enable it with the Web Admin kill switch.
4. **Share import is Web-Admin-only** — the upstream CLI and enclave paths are not exposed; import in setup mode, then restart so the co-signer starts.

---

## What Is Unchanged from Upstream

- FROST threshold signing and distributed key generation coordinated over Nostr relays
- NIP-46 bunker remote signing for any compatible Nostr client
- The `keep-web` admin SPA and its bearer-authenticated `/api` surface
- Argon2id + XChaCha20-Poly1305 vault encryption with keys zeroized in RAM
- The co-signing kill switch and live signing-activity feed

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for environment setup, the submodule and `make x86` build, and the release workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: keep
architectures: [x86_64]
image: keep (built from source; keep-web crate + Svelte SPA)
volumes:
  main: /data
ports:
  ui: 8080
dependencies: none
startos_managed_env_vars:
  - KEEP_PATH
  - KEEP_WEB_LISTEN
  - KEEP_WEB_UI_DIR
  - KEEP_PASSWORD
  - KEEP_WEB_AUTH_TOKEN
  - KEEP_BUNKER_RELAY
  - KEEP_FROST_RELAY
  - KEEP_FROST_GROUP
actions:
  - set-web-admin-password
  - configure
health_checks:
  - primary: port_check 8080
backup_volumes:
  - main
```
