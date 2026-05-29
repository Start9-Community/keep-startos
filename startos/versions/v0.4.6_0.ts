import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_4_6_0 = VersionInfo.of({
  version: '0.4.6:0',
  releaseNotes: {
    en_US:
      'Multiple key groups: the co-signer no longer crashes when the vault holds more than one FROST group. It serves one group at a time (auto-selected by default) and you can switch which group is served from the Web Admin. Default relay is now wss://bucket.coracle.social, which reliably delivers FROST coordination traffic.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
