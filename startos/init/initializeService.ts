import { utils } from '@start9labs/start-sdk'
import { showLoginCredentials } from '../actions/showLoginCredentials'
import { ensureCredentials } from '../credentials'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const initializeService = sdk.setupOnInit(async (effects, kind) => {
  // Seed defaults on every init so new schema defaults apply on upgrade.
  await storeJson.merge(effects, {})

  if (kind !== 'install') return

  // Generate the vault password once at install. It encrypts the Keep vault at
  // rest; it lives in the (backed-up) main volume's store.json. The Web Admin
  // token is handled lazily by ensureCredentials so it survives upgrades.
  await storeJson.merge(effects, {
    vaultPassword: utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 32,
    }),
  })

  // Mint the Web Admin credentials now and surface a task so the operator saves
  // them before opening the UI (no log-digging, no env vars).
  await ensureCredentials(effects)
  await sdk.action.createOwnTask(effects, showLoginCredentials, 'important', {
    reason: 'Save your Keep Web Admin username and password, then sign in.',
    replayId: 'save-login-credentials',
  })
})
