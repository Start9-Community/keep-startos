export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Keep co-signer': 0,
  'Web Admin': 1,
  'The Keep admin UI is ready': 2,
  'The Keep admin UI is not responding': 3,

  // interfaces.ts
  'Import your FROST share, view the bunker connection, and watch signing activity': 4,

  // actions/configure.ts
  Configure: 5,
  'Configure the relays and group for the FROST co-signer': 6,
  'Bunker Relays': 7,
  'Relays used for the NIP-46 bunker (where Nostr clients reach this signer). At least one is required.': 8,
  'FROST Relays': 9,
  'Relays used to coordinate FROST signing rounds with your other devices. These must match the relays your other share-holders use. At least one is required.': 10,
  'Group (npub)': 11,
  'Optional: the FROST group to co-sign for. Leave blank to auto-detect from the imported share.': 12,
  'Configuration saved': 13,
  'The service is restarting with the new settings.': 14,

  // actions/setWebAdminPassword.ts
  'Set Web Admin Password': 15,
  'Generate a new random password to sign in to the Keep Web Admin. Run this again at any time to rotate it; the current password is replaced.': 16,
  'Web Admin Password': 17,
  'Use this password to sign in to the Keep Web Admin.': 18,
  Username: 19,
  Password: 20,

  // init/watchCredentials.ts
  'Set your Keep Web Admin password, then sign in.': 21,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
