# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `keep`.** An always-on FROST threshold co-signer for Nostr and Bitcoin. A single subcontainer (`keep-cosigner`) runs the `keep-web` binary, which is configured entirely through env; the encrypted vault lives under the mounted `main` volume so StartOS backups capture it. Exports one `ui` interface (Web Admin). x86_64-only (keep-web builds for x86_64; `ARCHES := x86` in the Makefile).

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach keep -n keep-cosigner -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `keep-cosigner`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
