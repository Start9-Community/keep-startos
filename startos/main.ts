import { ensureCredentials } from './credentials'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Keep co-signer'))

  const store = await storeJson.read().const(effects)
  if (!store) throw new Error('no store.json')

  // Generate-if-missing so the token survives upgrades and matches the action.
  const credentials = await ensureCredentials(effects)

  // keep-web is configured entirely through env. The vault lives under the
  // mounted volume so it is captured by StartOS backups.
  const env: Record<string, string> = {
    KEEP_PATH: '/data/vault',
    KEEP_WEB_LISTEN: `0.0.0.0:${uiPort}`,
    KEEP_WEB_UI_DIR: '/app/ui',
    KEEP_PASSWORD: store.vaultPassword,
    KEEP_WEB_AUTH_TOKEN: credentials.password,
    // keep-web splits these on commas into a relay list.
    KEEP_BUNKER_RELAY: store.bunkerRelays.join(','),
    KEEP_FROST_RELAY: store.frostRelays.join(','),
  }
  // Optional explicit group; otherwise keep-web auto-resolves from the share.
  if (store.frostGroup) env.KEEP_FROST_GROUP = store.frostGroup

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'keep' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/data',
      readonly: false,
    }),
    'keep-cosigner',
  )

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: { command: ['/app/keep-web'], env },
    ready: {
      display: i18n('Web Admin'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The Keep admin UI is ready'),
          errorMessage: i18n('The Keep admin UI is not responding'),
        }),
    },
    requires: [],
  })
})
