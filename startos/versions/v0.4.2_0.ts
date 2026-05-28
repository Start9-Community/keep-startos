import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_4_2_0 = VersionInfo.of({
  version: '0.4.2:0',
  releaseNotes: {
    en_US:
      'Reliable repeated bunker signing: imported shares now aggregate correctly (no more "Unknown identifier"), and a spurious "No nonces stored" failure is gone. Credential files are written atomically and fail closed if corrupted, so the bunker URL stays stable across restarts.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
