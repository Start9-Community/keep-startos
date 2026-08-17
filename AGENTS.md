# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **The Web Admin credential is a bearer token; the username is cosmetic.** `ADMIN_USERNAME` exists so password managers have a field to key on. Leaving the token unset is deliberate fail-closed behavior — keep-web mints a throwaway one — and the critical task is what drives the user to set a known value.
