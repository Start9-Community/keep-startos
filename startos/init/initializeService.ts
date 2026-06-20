import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const initializeService = sdk.setupOnInit(async (effects, kind) => {
  // Seed defaults on every init so new schema defaults apply on upgrade.
  await storeJson.merge(effects, {})

  if (kind !== 'install') return

  // Generate the vault password once, at install only. It is an internal secret
  // (recipe-internal-secrets): it encrypts the Keep vault at rest and is never
  // shown to the user. It lives in the backed-up main volume's store.json, so it
  // survives upgrades/restarts and is restored alongside the vault — gating on
  // `install` keeps a restore from overwriting the restored password.
  await storeJson.merge(effects, {
    vaultPassword: utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 32,
    }),
  })
})
