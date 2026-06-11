import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_4_7_0 = VersionInfo.of({
  version: '0.4.7:0',
  releaseNotes: {
    en_US:
      'Bounded multi-event pre-approval cache (cap 100, TTL 5 min) and single-party FROST sign/ECDH refinements, so wallet descriptor coordination and multi-event signing flows no longer stall after a single pre-approval. Includes the automated fund sweep on descriptor migration.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
