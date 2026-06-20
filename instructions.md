# Keep

> **Before you start:** Keep co-signs for a FROST group you created **somewhere else** (for example, the Keep Android app). This package holds and imports your share(s) of one or more such groups — it does not generate keys on its own. Have your share export ready.

## Documentation

- [Keep usage guide](https://github.com/privkeyio/keep/blob/main/docs/USAGE.md) — exporting and importing shares, bunker mode, and signing.
- [Keep security model](https://github.com/privkeyio/keep/blob/main/docs/SECURITY.md) — how the vault, keys, and FROST shares are protected.
- [Keep upstream README](https://github.com/privkeyio/keep#readme) — project overview and features.

## What you get on StartOS

- A **Web Admin** interface (the `ui` interface, reachable on your LAN) for importing your share, reading the bunker connection string, toggling co-signing, and watching signing activity.
- An always-on **FROST co-signer** — the reliably online member of your quorum, so signing from your phone or laptop no longer needs two devices awake at once.
- A **NIP-46 bunker** any Nostr client can point at to request signatures; Keep coordinates each one with your other devices over Nostr relays.
- Your FROST share — one per group — held in an encrypted vault on the backed-up `main` volume.

## Getting set up

You need an existing FROST group and a share export from the device that created it (e.g. Keep Android → Export Share → show text or QR).

1. **Set your login.** On install, StartOS prompts you with a critical **Set Web Admin Password** action. Run it, save the generated password to your password manager, and use it to sign in — the username is `admin`. Run the same action any time to rotate the password.
2. **Import your share.** Open the **Web Admin**. On a fresh install it starts in setup mode with no share loaded. Paste your FROST share export (a `kshare1…` string or JSON) and its passphrase.
3. **Restart Keep.** The co-signer loads your share at startup, so restart the service once the share is imported. It then announces itself on your FROST relay and waits in standby.
4. **Enable co-signing.** Co-signing ships **off** (fail-closed). Flip the kill switch in the Web Admin to turn it on; the setting persists across restarts.

Once it's running, the Web Admin shows your bunker connection string (npub), the group, the threshold, and a live feed of signing activity. If you import shares for more than one group, the Shares section marks the active group and lets you switch which one the co-signer serves.

## Using Keep

### Web Admin

Sign in with the username `admin` and the password from **Set Web Admin Password**. The Web Admin is where you import your share(s), read your bunker connection string, flip the co-signing kill switch, switch the active group in the Shares section, and watch signing activity.

### Co-signing kill switch

Co-signing is controlled by the kill switch in the Web Admin, not by an action. Toggle it live with no restart; it persists across restarts. While it's on, Keep joins signing rounds automatically within policy — the human approval still happens on your other device.

### Connecting a Nostr client

Point any NIP-46 ("bunker") capable Nostr client at the connection string shown in the Web Admin. When the client requests a signature, Keep coordinates a FROST round with your other devices to produce it.

### Actions

- **Set Web Admin Password** — generate or rotate the Web Admin password. Surfaced as a critical task on a fresh install.
- **Configure** — set the relays and group Keep uses:
  - **Bunker Relays** — where Nostr clients reach this signer over NIP-46. Pre-filled with `wss://bucket.coracle.social`; keep at least one.
  - **FROST Relays** — where signing rounds are coordinated with your other devices; these must match the relays your other devices use. Pre-filled with `wss://bucket.coracle.social`, which reliably carries the rapid FROST signing traffic that most general-purpose relays drop; keep at least one.
  - **Group (npub)** — optional override. Leave blank and the co-signer serves your share's group automatically; with shares for more than one group it auto-selects one and you can switch which is served from the Web Admin's Shares section. Set this only to pin a specific group.

## Security notes

- Because Keep runs unattended, your share is decrypted in memory while the service is running. That is the trade-off for an always-on signer.
- This server holds only one share of any group — compromising it alone cannot sign or reconstruct a key; an attacker would still need to reach the threshold using your other devices.
