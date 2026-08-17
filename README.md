<p align="center">
  <img src="icon.png" alt="Keep Logo" width="21%">
</p>

# Keep on StartOS

> Everything not listed in this document should behave the same as upstream
> Keep. If a feature, setting, or behavior is not mentioned here, the upstream
> documentation is accurate and fully applicable — see the Documentation
> section of `instructions.md` for links.

[Keep](https://github.com/privkeyio/keep) is a FROST co-signer for Nostr: it holds one share of a threshold key and takes part in signing rounds, so no single device holds the whole key. This package runs the co-signer as an always-on participant, encrypts its vault at rest, and serves a NIP-46 bunker that Nostr clients connect to.

**It does not generate keys.** The group is created elsewhere, and this package imports a share of it.

- **Upstream repo:** <https://github.com/privkeyio/keep>
- **Wrapper repo:** <https://github.com/Start9-Community/keep-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One image, built here.

| Property      | Value                                              |
| ------------- | -------------------------------------------------- |
| Image         | Built from this repo's `Dockerfile`                |
| Architectures | x86_64 only                                        |
| Command       | The web binary, configured entirely by environment |

| Subcontainer    | Purpose                                  |
| --------------- | ---------------------------------------- |
| `keep-cosigner` | The only daemon — the one to `attach` to |

**The application takes no config file at all** — every setting reaches it as an environment variable, which is why the package's store is the whole of its configuration.

## Volume and Data Layout

One volume, and what is on it is the point.

| Volume | Mount Point | Purpose                           |
| ------ | ----------- | --------------------------------- |
| `main` | `/data`     | The encrypted vault and the store |

**The vault holds your FROST share**, encrypted at rest with a password the package generates. It is deliberately placed under the mounted volume so it is captured by backups — see [Backups and Restore](#backups-and-restore), because the two halves of that encryption travel together.

## File Models

One model, and it is the entire configuration surface.

| File                | Format | Modelled                | Written by           |
| ------------------- | ------ | ----------------------- | -------------------- |
| `start9/store.json` | JSON   | Yes — `FileHelper.json` | Init and the actions |

- **`vaultPassword`** — generated once **at install only**, never shown, and never regenerated. It encrypts the vault at rest. The install-only gate is what stops a restore overwriting the password that its restored vault was encrypted with.
- **`webAuthToken`** — the Web Admin credential, unset until the action creates it.
- **`bunkerRelays` / `frostRelays`** — the two relay lists.
- **`frostGroup`** — an optional explicit group; left empty, the application resolves it from the imported share.

Everything is read reactively, so any change restarts the co-signer onto it.

**The relay lists can never be empty**, and that is enforced twice: the form requires at least one, and `main` falls back to the default set if the store somehow holds none. The application's bunker refuses to start with an empty relay list, so an empty list would crash the co-signer rather than degrade it.

**The relay defaults are not a redundancy choice, and adding arbitrary relays is a mistake.** FROST coordination depends on rapid ephemeral events that most general-purpose relays simply drop — a relay that works fine for ordinary Nostr traffic will silently stall signing rounds. The default mirrors upstream's, which is known to deliver them. Add only relays known to carry that event kind.

## Dependencies

None. The co-signer reaches its peers and its clients over Nostr relays rather than over anything on this server.

## Network Access and Interfaces

One interface — and the connection that matters most does not go through it.

| Interface | Id   | Type | Port | Description                                                        |
| --------- | ---- | ---- | ---- | ------------------------------------------------------------------ |
| Web Admin | `ui` | ui   | 8080 | Import a share, view the bunker connection, watch signing activity |

Bound on the `ui-multi` MultiHost over HTTP and not masked.

**Nostr clients do not connect to this address.** They reach the co-signer through the NIP-46 bunker, over the relays — so the bunker works from anywhere without this interface being reachable at all, and the interface can stay on a private address.

Signing peers likewise coordinate over relays, not over any port here.

## Installation and First-Run Flow

Install generates the vault password and seeds the defaults, then raises a critical task to set the Web Admin password.

**Until that token is set the application is fail-closed**: it mints a throwaway token of its own, so the admin interface cannot be signed into. The task is what drives the user to set a known one.

After that the sequence is:

1. Set the Web Admin password and sign in.
2. **Import your share**, exported from wherever the group was created. Nothing works before this — the package holds no key of its own.
3. Adjust relays if you have known-good ones to add, and connect a Nostr client to the bunker.

## Actions

Two actions.

### Set Web Admin Password

Generates the Web Admin credential and shows it once. Run it when its task appears, or to rotate it.

- **What it changes:** the token in the store, which becomes the application's expected bearer token on restart.
- **Cost:** the service restarts.
- **Repeat safety:** each run generates a **new** credential and invalidates the old one.
- **Outputs:** a fixed username and the generated password. The username is constant and exists so password managers have something to key on — the credential is really the token alone.

### Configure

The two relay lists and the optional group.

- **What it changes:** those fields in the store.
- **Cost:** the service restarts and reconnects to the new relays.
- **Repeat safety:** idempotent.
- **The form enforces at least one relay per list**, and caps both the count and each URL's length to upstream's limits.
- **Leave the group empty unless you hold shares for more than one.** Empty means "resolve it from the imported share", which is right for the ordinary single-group case.

## Tasks

One, and it is reactive.

| Task                   | Severity   | Raised when                  | Cleared when    |
| ---------------------- | ---------- | ---------------------------- | --------------- |
| Set Web Admin Password | `critical` | Any init that finds no token | The action runs |

It is re-evaluated on every init rather than raised once at install, so clearing the token brings the prompt back.

`critical` blocks the service from starting and suspends the ordinary controls.

## Health Checks

One check, on the only daemon.

| Check     | Displayed as | Method                 |
| --------- | ------------ | ---------------------- |
| `primary` | "Web Admin"  | Port 8080 is listening |

It reports that the admin interface is serving. **It says nothing about the things that actually matter here** — whether a share has been imported, whether the bunker is reachable on its relays, or whether signing rounds are completing. Those are visible in the admin interface, and a green check with no imported share is the normal state of a fresh install.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. That is the encrypted vault **and** the password that decrypts it.

**So the backup is equivalent to the share it protects.** Encryption at rest guards the file on disk, not the backup, because both halves travel together — which is what makes a restore work at all, and what makes the backup as sensitive as the key material itself.

A restored instance comes back with its share, its relays, and its Web Admin credential, and rejoins signing rounds without re-importing anything. The vault password is **not** regenerated on restore, which is the whole reason it is generated only at install.

**A share is one of several by design.** Losing this one does not lose the group's key, provided the threshold can still be met from the other holders — that is the point of FROST, and it is the fallback if this backup is ever lost.

## Limitations and Differences

1. **The backup carries both the vault and its password**, so it is as sensitive as the share.
2. **No key generation.** The group is created elsewhere and a share imported here.
3. **Relay choice is consequential.** Most general-purpose relays drop the ephemeral events FROST needs, and a bad relay stalls signing silently.
4. **x86_64 only.**
5. **The health check does not observe signing.** A green service can be entirely idle or unable to reach its peers.
6. **The vault password is never shown and never rotated**, deliberately — rotating it would orphan the vault.
7. **The admin interface is a bearer token, with a cosmetic username.**

---

## Quick Reference for AI Consumers

```yaml
package_id: keep
image: built from ./Dockerfile
architectures:
  - x86_64
subcontainers:
  - keep-cosigner
volumes:
  main: /data # the encrypted vault, plus start9/store.json
file_models:
  - start9/store.json # the whole configuration surface
startos_managed_env_vars:
  - KEEP_PATH
  - KEEP_WEB_LISTEN
  - KEEP_WEB_UI_DIR
  - KEEP_PASSWORD
  - KEEP_BUNKER_RELAY
  - KEEP_FROST_RELAY
  - KEEP_WEB_AUTH_TOKEN # only once the action has set one
  - KEEP_FROST_GROUP # only when explicitly set
dependencies: []
interfaces:
  ui: { type: ui, port: 8080 } # Nostr clients reach the bunker over relays, not here
actions:
  - configure
  - set-web-admin-password
tasks:
  - { action: set-web-admin-password, severity: critical } # reactive
health_checks:
  - primary # displayed "Web Admin"; observes the interface only
```
