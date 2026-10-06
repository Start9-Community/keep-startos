import { sdk } from '../sdk'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { initializeService } from './initializeService'
import { watchCredentials } from './watchCredentials'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  actions,
  dependencies,
  initializeService,
  watchCredentials,
)

export const uninit = sdk.setupUninit(versionGraph)
