# Keep

Keep turns your StartOS server into an always-on member of your FROST signing quorum. It holds one share of a multi-device key and coordinates with your other devices (phone, laptop) over Nostr relays to produce signatures. No single device, including this one, ever holds the whole key.

> **Important:** Keep only works as part of a multi-device FROST group you already created elsewhere (for example, the Keep Android app). This package imports one share of that group; it does not create keys on its own.

## Why run it on StartOS

Threshold signing needs enough devices online at the same moment. Phones sleep and drop connectivity, so two of them rarely line up. An always-on server fixes that: it is the reliably online co-signer, so signing from your other device works on demand instead of needing two devices awake at once. It also keeps signing nonces pre-staged for instant signatures.

## First-time setup

1. **Open the Web Admin** interface. Enter the admin token when prompted. The token is generated at install and printed to the service logs (look for "generated a random auth token"); copy it from there.
2. **Import your share.** On a fresh install the Web Admin starts in setup mode, with no share loaded. Paste your FROST share export (a `kshare1…` string or JSON) and its passphrase. You create this export on the device that holds the group, for example Keep Android, Export Share, Show text or QR.
3. **Restart the service.** Once a share is present, restarting starts the co-signer. It announces itself on the FROST relay and is ready to take part in signing rounds.

After that, the Web Admin shows the bunker connection string (npub), the group, the threshold, and a live feed of signing activity.

## Configuration

Use the **Configure** action to set:

- **Bunker Relays:** where Nostr clients reach this signer over NIP-46. Default `wss://nos.lol`.
- **FROST Relays:** where signing rounds are coordinated with your other devices. These must match the relays your other devices use. Default `wss://nos.lol`.
- **Group (npub):** optional. Leave blank to auto-detect the single imported share's group; set it only if the vault holds shares for more than one group.
- **Auto co-sign:** on by default. The server takes part in signing rounds automatically within policy, while the human approval happens on your other device. Turn it off as a kill switch to make this node refuse to sign. You can also toggle this live in the Web Admin without a restart.

Saving the configuration restarts the service.

## Connecting a Nostr client

Point any NIP-46 ("bunker") capable Nostr client at the bunker connection string shown in the Web Admin. When the client requests a signature, this node coordinates a FROST round with your other devices to produce it.

## Security notes

- The vault is encrypted at rest with a password generated at install and stored in this package's data volume, which is captured by StartOS backups. Because the service runs unattended, the share is decrypted in memory while it runs. That is the trade-off for an always-on signer.
- This node holds only one share. Compromising it alone cannot sign or reconstruct your key; an attacker would still need to reach the threshold using your other devices.
