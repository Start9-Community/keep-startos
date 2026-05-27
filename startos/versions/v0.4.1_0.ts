import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_4_1_0 = VersionInfo.of({
  version: '0.4.1:0',
  releaseNotes: {
    en_US:
      'Peer presence (online/offline) now appears in the Web Admin activity feed.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
