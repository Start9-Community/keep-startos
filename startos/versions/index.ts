import { VersionGraph } from '@start9labs/start-sdk'
import { v0_4_0_0 } from './v0.4.0_0'
import { v0_4_1_0 } from './v0.4.1_0'

export const versionGraph = VersionGraph.of({
  current: v0_4_1_0,
  other: [v0_4_0_0],
})
