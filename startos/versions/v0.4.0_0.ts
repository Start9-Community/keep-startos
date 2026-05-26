import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_4_0_0 = VersionInfo.of({
  version: '0.4.0:0',
  releaseNotes: {
    en_US:
      'Initial release of Keep, the always-on FROST co-signer, for StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
