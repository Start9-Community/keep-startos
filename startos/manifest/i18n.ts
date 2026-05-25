export const short = {
  en_US: 'Always-on FROST threshold co-signer for Nostr and Bitcoin',
}

export const long = {
  en_US:
    'Keep is an always-on FROST threshold signer. It holds one share of a multi-device key and coordinates with your other devices over Nostr relays to produce signatures, so no single device ever holds the whole key. Running it on your StartOS server gives your quorum a reliable, always-online member: signing from your other devices works on demand instead of needing two devices awake at once. It exposes a NIP-46 bunker so any Nostr client can request signatures, plus a web admin UI for importing your share and watching signing activity.',
}
