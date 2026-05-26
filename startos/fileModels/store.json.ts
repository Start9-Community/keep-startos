import { z, FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { defaultBunkerRelay, defaultFrostRelay } from '../utils'

// Package-internal state. Written only by our init + actions, so .const()
// gives automatic restart-on-change.
const storeConfigSchema = z.object({
  // Generated once at install; encrypts the Keep vault at rest.
  vaultPassword: z.string().catch(''),
  // Generated once at install; bearer token for the Web Admin login.
  webAuthToken: z.string().catch(''),
  // Relays where Nostr clients reach the NIP-46 bunker.
  bunkerRelays: z.array(z.string()).catch([defaultBunkerRelay]),
  // Relays used to coordinate FROST signing rounds with peer devices.
  frostRelays: z.array(z.string()).catch([defaultFrostRelay]),
  // The group npub to co-sign for. Empty = auto-detect the single imported
  // share's group.
  frostGroup: z.string().catch(''),
})

export type StoreConfig = z.infer<typeof storeConfigSchema>

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: 'start9/store.json' },
  storeConfigSchema,
)
