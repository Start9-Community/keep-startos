import { sdk } from '../sdk'
import { configure } from './configure'
import { showLoginCredentials } from './showLoginCredentials'

export const actions = sdk.Actions.of()
  .addAction(configure)
  .addAction(showLoginCredentials)
