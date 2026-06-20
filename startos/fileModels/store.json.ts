import { z, FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { defaultRelays } from '../utils'

// Package-internal state. Written only by our init + actions, so .const()
// gives automatic restart-on-change.
const storeConfigSchema = z.object({
  // Generated once at install; encrypts the Keep vault at rest.
  vaultPassword: z.string().catch(''),
  // Bearer token for the Web Admin login. Unset until the user runs the
  // Set/Reset Web Admin Password action (recipe-admin-credentials).
  webAuthToken: z.string().optional().catch(undefined),
  // Relays where Nostr clients reach the NIP-46 bunker. At least one is
  // required — keep-web's bunker will not start with an empty list.
  bunkerRelays: z.array(z.string()).catch(defaultRelays),
  // Relays used to coordinate FROST signing rounds with peer devices.
  frostRelays: z.array(z.string()).catch(defaultRelays),
  // The group npub to co-sign for. Empty = auto-detect the single imported
  // share's group.
  frostGroup: z.string().catch(''),
})

export type StoreConfig = z.infer<typeof storeConfigSchema>

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: 'start9/store.json' },
  storeConfigSchema,
)
