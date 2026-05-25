# Keep

Keep turns your StartOS server into an always-on member of your FROST signing quorum. It holds **one share** of a multi-device key and coordinates with your other devices (phone, laptop) over Nostr relays to produce signatures. No single device — including this one — ever holds the whole key.

> [!IMPORTANT]
> Keep is only useful as part of a multi-device FROST group you already created elsewhere (e.g. the Keep Android app). This package imports **one share** of that group. It does not create keys on its own.

## Why run it on StartOS

Threshold signing needs enough devices online *at the same time*. Phones sleep and drop connectivity, so two phones rarely line up. An always-on server fixes that: it's the reliably-online co-signer, so signing from your other device works on demand instead of needing two devices awake at once. It also keeps signing nonces pre-staged for instant signatures.

## First-time setup

1. **Open the Web Admin** interface. On a fresh install it starts in **setup mode** — no share loaded yet.
2. **Import your share.** In the Web Admin, paste your FROST share export (a `kshare1…` string or JSON) and its passphrase. You export this from the device that created the group (e.g. Keep Android → export share → show text/QR).
3. **Restart the service.** Once a share is present, restarting starts the co-signer. It announces itself on the FROST relay and is ready to participate in signing rounds.

After that, the Web Admin shows the bunker connection string (npub), the group, the threshold, and a live feed of signing activity.

## Configuration

Use the **Configure** action to set:

- **Bunker Relay** — where Nostr clients reach this signer over NIP-46. Default `wss://nos.lol`.
- **FROST Relay** — where signing rounds are coordinated with your other devices. **This must match the relay your other devices use.** Default `wss://nos.lol`.
- **Group (npub)** — optional. Leave blank to auto-detect the single imported share's group; set it if the vault holds shares for more than one group.
- **Auto co-sign** — on by default. The server auto-participates in signing rounds within policy (the human approval happens on your *other* device). Turn it off as a kill switch to make this node refuse to co-sign.

Saving the configuration restarts the service.

## Connecting a Nostr client

Point any NIP-46 ("bunker") capable Nostr client at the bunker connection string shown in the Web Admin. When the client requests a signature, this node coordinates a FROST round with your other devices to produce it.

## Security notes

- The vault is encrypted at rest with a password generated at install and stored in this package's data volume (captured by StartOS backups). Because the service runs unattended, the share is decrypted in memory while it runs — this is the trade-off for an always-on signer.
- This node holds only one share. Compromising it alone cannot sign or reconstruct your key; an attacker would still need to reach the threshold with your other devices.
