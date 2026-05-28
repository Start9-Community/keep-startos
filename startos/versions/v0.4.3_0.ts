import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v0_4_3_0 = VersionInfo.of({
  version: '0.4.3:0',
  releaseNotes: {
    en_US:
      'Web Admin UX: live co-signer presence with a readiness indicator (Ready to sign / Waiting for co-signers), a prominent approval bar with browser-tab and opt-in desktop alerts, a decluttered activity feed (repeated events collapse into one line), relative timestamps, and a signing log grouped by session with expandable detail.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
