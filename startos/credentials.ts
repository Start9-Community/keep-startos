import { T, utils } from '@start9labs/start-sdk'
import { storeJson } from './fileModels/store.json'

export const ADMIN_USERNAME = 'admin'

export type KeepCredentials = {
  username: string
  password: string
}

// Generate-if-missing on every start (not install-only), so the token is
// stable across upgrades and always matches what the action reveals.
export async function ensureCredentials(
  effects: T.Effects,
): Promise<KeepCredentials> {
  const store = await storeJson.read().once()
  const password =
    store?.webAuthToken || utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 32 })

  if (store?.webAuthToken !== password) {
    await storeJson.merge(effects, { webAuthToken: password })
  }

  return { username: ADMIN_USERNAME, password }
}
