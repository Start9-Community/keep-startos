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
  'Configure the relays and policy for the FROST co-signer': 6,
  'Bunker Relays': 7,
  'Relays used for the NIP-46 bunker (where Nostr clients reach this signer)': 8,
  'FROST Relays': 9,
  'Relays used to coordinate FROST signing rounds with your other devices. These must match the relays your other share-holders use.': 10,
  'Group (npub)': 11,
  'Optional: the FROST group to co-sign for. Leave blank to auto-detect from the imported share.': 12,
  'Auto co-sign': 13,
  'Automatically participate in signing rounds within policy (turn off as a kill switch)': 14,
  'Configuration saved': 15,
  'The service is restarting with the new settings.': 16,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
