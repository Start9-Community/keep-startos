export const uiPort = 8080

// coracle's relay reliably delivers the rapid ephemeral (kind 24242) FROST
// signing traffic; nos.lol drops it, stalling signing rounds.
export const defaultBunkerRelay = 'wss://bucket.coracle.social'
export const defaultFrostRelay = 'wss://bucket.coracle.social'
