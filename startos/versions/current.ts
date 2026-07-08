import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.5.0:0',
  releaseNotes: {
    en_US:
      'Updates Keep to v0.5.0: threshold-OPRF vault unlock with TPM remote attestation, HD FROST wallets (BIP-32 / BIP-86), a software distributed-key-generation path, and substantial signing and cryptographic hardening.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
