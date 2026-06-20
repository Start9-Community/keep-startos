import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { ADMIN_USERNAME } from '../utils'

// Single source of truth for the Web Admin credential: this action generates,
// stores, and returns it — covering both first-set and rotation. The init
// watcher (init/watchCredentials.ts) only decides whether to surface the task.
// See recipe-admin-credentials.
export const setWebAdminPassword = sdk.Action.withoutInput(
  'set-web-admin-password',

  async () => ({
    name: i18n('Set Web Admin Password'),
    description: i18n(
      'Generate a new random password to sign in to the Keep Web Admin. Run this again at any time to rotate it; the current password is replaced.',
    ),
    warning: null,
    // Runnable while running or stopped: main reads the token reactively, so a
    // running service restarts onto the new token; a stopped one loads it on
    // next start.
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const password = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 32,
    })
    await storeJson.merge(effects, { webAuthToken: password })

    return {
      version: '1' as const,
      title: i18n('Web Admin Password'),
      message: i18n('Use this password to sign in to the Keep Web Admin.'),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: ADMIN_USERNAME,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
