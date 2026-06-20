import { sdk } from '../sdk'
import { configure } from './configure'
import { setWebAdminPassword } from './setWebAdminPassword'

export const actions = sdk.Actions.of()
  .addAction(configure)
  .addAction(setWebAdminPassword)
