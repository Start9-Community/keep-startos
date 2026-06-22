import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.4.8:1',
  releaseNotes: {
    en_US:
      'Initial release of Keep, the always-on FROST co-signer, for StartOS.',
    es_ES:
      'Versión inicial de Keep, el firmante conjunto FROST siempre activo, para StartOS.',
    de_DE:
      'Erste Version von Keep, dem stets aktiven FROST-Mitunterzeichner, für StartOS.',
    pl_PL:
      'Pierwsze wydanie Keep, zawsze aktywnego współsygnatariusza FROST, dla StartOS.',
    fr_FR:
      'Première version de Keep, le cosignataire FROST toujours actif, pour StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
