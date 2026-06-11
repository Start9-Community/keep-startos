import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_4_8_0 = VersionInfo.of({
  version: '0.4.8:0',
  releaseNotes: {
    en_US:
      'Production race fixes in ECDH and signing coordination (subscribe-before-send), persistent NIP-46 grants CLI with hidden-vault support, bunker auto-approval + transport-key persistence fix, and an audit-log expansion covering rotate_password / rotate_data_key and rate-limit trips. Includes the closing-out mutation-testing campaign on signing / ECDH / descriptor / PSBT / NIP-46 modules and a dependency bump to frost 3.0.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
