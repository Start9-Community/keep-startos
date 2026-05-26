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
  'Relays used for the NIP-46 bunker (where Nostr clients reach this signer)': 8,
  'FROST Relays': 9,
  'Relays used to coordinate FROST signing rounds with your other devices. These must match the relays your other share-holders use.': 10,
  'Group (npub)': 11,
  'Optional: the FROST group to co-sign for. Leave blank to auto-detect from the imported share.': 12,
  'Configuration saved': 15,
  'The service is restarting with the new settings.': 16,

  // actions/showLoginCredentials.ts
  'Show Login Credentials': 17,
  'Reveal the username and password for the Web Admin': 18,
  'Web Admin Login': 19,
  'Use these credentials to sign in to the Keep Web Admin.': 20,
  Username: 21,
  Password: 22,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
