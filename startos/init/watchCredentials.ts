import { setWebAdminPassword } from '../actions/setWebAdminPassword'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

// Surface a critical task whenever the Web Admin token is unset, pointing at the
// Set/Reset Web Admin Password action. Reactive (.const) so it re-evaluates on
// every init and stops nagging once the action has set a token.
export const watchCredentials = sdk.setupOnInit(async (effects) => {
  const store = await storeJson.read().const(effects)

  if (!store?.webAuthToken) {
    await sdk.action.createOwnTask(effects, setWebAdminPassword, 'critical', {
      reason: i18n('Set your Keep Web Admin password, then sign in.'),
    })
  }
})
