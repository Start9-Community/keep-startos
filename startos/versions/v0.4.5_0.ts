import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_4_5_0 = VersionInfo.of({
  version: '0.4.5:0',
  releaseNotes: {
    en_US:
      'Co-signer reliability: peers now report accurate online/offline presence, and signing rounds gracefully fall back to interactive mode when a pre-exchanged nonce is stale, preventing stuck or failed co-sign requests.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
