import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { defaultRelays, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Keep co-signer'))

  const store = await storeJson.read().const(effects)
  if (!store) throw new Error('no store.json')

  // keep-web's bunker refuses to start with no relays (it would crash the
  // co-signer), so never hand it an empty list — fall back to the default set
  // if the store somehow holds one. The form enforces at least one, so this is
  // belt-and-suspenders against a hand-edited or corrupted store.
  const bunkerRelays = store.bunkerRelays.length
    ? store.bunkerRelays
    : defaultRelays
  const frostRelays = store.frostRelays.length
    ? store.frostRelays
    : defaultRelays

  // keep-web is configured entirely through env. The vault lives under the
  // mounted volume so it is captured by StartOS backups.
  const env: Record<string, string> = {
    KEEP_PATH: '/data/vault',
    KEEP_WEB_LISTEN: `0.0.0.0:${uiPort}`,
    KEEP_WEB_UI_DIR: '/app/ui',
    KEEP_PASSWORD: store.vaultPassword,
    // keep-web splits these on commas into a relay list.
    KEEP_BUNKER_RELAY: bunkerRelays.join(','),
    KEEP_FROST_RELAY: frostRelays.join(','),
  }
  // The Web Admin bearer token is set by the Set/Reset Web Admin Password
  // action. Until then it is unset and keep-web stays fail-closed (it mints a
  // throwaway token); the critical task drives the user to set a known one.
  // Reactive store read above means setting it restarts the daemon onto it.
  if (store.webAuthToken) env.KEEP_WEB_AUTH_TOKEN = store.webAuthToken
  // Optional explicit group; otherwise keep-web auto-resolves from the share.
  if (store.frostGroup) env.KEEP_FROST_GROUP = store.frostGroup

  const subcontainer = sdk.SubContainer.of(
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
