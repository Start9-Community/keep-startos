# Keep

Keep turns your StartOS server into an always-on member of your FROST signing quorum. It holds one share of a multi-device key and coordinates with your other devices (phone, laptop) over Nostr relays to produce signatures. No single device, including this one, ever holds the whole key.

> **Important:** Keep only works as part of a multi-device FROST group you already created elsewhere (for example, the Keep Android app). This package imports one share of that group; it does not create keys on its own.

## Why run it on StartOS

Threshold signing needs enough devices online at the same moment. Phones sleep and drop connectivity, so two of them rarely line up. An always-on server fixes that: it is the reliably online co-signer, so signing from your other device works on demand instead of needing two devices awake at once. It also keeps signing nonces pre-staged for instant signatures.

## First-time setup

1. **Get your login.** After install, run the **Show Login Credentials** action (also surfaced as a task) to see your Web Admin username and password. Open the Web Admin and sign in with them.
2. **Import your share.** On a fresh install the Web Admin starts in setup mode, with no share loaded. Paste your FROST share export (a `kshare1…` string or JSON) and its passphrase. You create this export on the device that holds the group, for example Keep Android, Export Share, Show text or QR.
3. **Restart the service.** Once a share is present, restarting starts the co-signer. It announces itself on the FROST relay, but stays in standby until you enable co-signing.
4. **Enable co-signing.** Use the kill switch in the Web Admin to turn co-signing on (it ships off, fail-closed). The setting persists across restarts.

After that, the Web Admin shows the bunker connection string (npub), the group, the threshold, and a live feed of signing activity. If you import shares for more than one group, the Shares section marks the active group and lets you switch which one the co-signer serves.

## Configuration

Use the **Configure** action to set:

- **Bunker Relays:** where Nostr clients reach this signer over NIP-46. Default `wss://bucket.coracle.social`.
- **FROST Relays:** where signing rounds are coordinated with your other devices. These must match the relays your other devices use. Default `wss://bucket.coracle.social`.
- **Group (npub):** optional override. Leave blank and the co-signer serves your share's group automatically. If the vault holds shares for more than one group it auto-selects one (no crash) and you can switch which group is served from the Web Admin's Shares section. Set this only to pin a specific group.

Saving the configuration restarts the service.

## Turning co-signing on and off

Co-signing is controlled by the kill switch in the Web Admin, not the Configure action. A fresh install starts with co-signing **off** (fail-closed), so the node won't sign until you turn it on. Toggle it live in the Web Admin with no restart; the setting persists across restarts. While it's on, the node takes part in signing rounds automatically within policy, and the human approval happens on your other device.

## Connecting a Nostr client

Point any NIP-46 ("bunker") capable Nostr client at the bunker connection string shown in the Web Admin. When the client requests a signature, this node coordinates a FROST round with your other devices to produce it.

## Security notes

- The vault is encrypted at rest with a password generated at install and stored in this package's data volume, which is captured by StartOS backups. Because the service runs unattended, the share is decrypted in memory while it runs. That is the trade-off for an always-on signer.
- This node holds only one share. Compromising it alone cannot sign or reconstruct your key; an attacker would still need to reach the threshold using your other devices.
