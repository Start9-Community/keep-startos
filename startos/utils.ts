export const uiPort = 8080

// keep-web auth is a single bearer token; the Web Admin login form pairs it
// with a fixed, readonly "admin" username (for password managers).
export const ADMIN_USERNAME = 'admin'

// Default relay(s) we hand keep-web. keep-web sources relays ONLY from env
// (KEEP_BUNKER_RELAY / KEEP_FROST_RELAY) — never the vault's RelayConfig or the
// imported share — and its bunker refuses to start with zero relays, so the
// package must supply at least one. We mirror upstream keep-core's default: a
// single coracle relay, which reliably delivers the rapid ephemeral (kind 24242)
// events FROST coordination depends on. Most general-purpose relays (nos.lol,
// damus, …) drop those, stalling signing rounds — so this is NOT a place to add
// "redundancy" with arbitrary relays; operators add more known-good relays via
// the Configure action. Re-sync if upstream changes its default.
export const defaultRelays = ['wss://bucket.coracle.social']

// Upstream caps from keep-core `relay.rs` (MAX_RELAYS, MAX_RELAY_URL_LENGTH).
export const maxRelays = 10
export const maxRelayUrlLength = 256
