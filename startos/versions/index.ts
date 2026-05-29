import { VersionGraph } from '@start9labs/start-sdk'
import { v0_4_0_0 } from './v0.4.0_0'
import { v0_4_1_0 } from './v0.4.1_0'
import { v0_4_2_0 } from './v0.4.2_0'
import { v0_4_3_0 } from './v0.4.3_0'
import { v0_4_5_0 } from './v0.4.5_0'
import { v0_4_6_0 } from './v0.4.6_0'
import { v0_4_7_0 } from './v0.4.7_0'

export const versionGraph = VersionGraph.of({
  current: v0_4_7_0,
  other: [v0_4_0_0, v0_4_1_0, v0_4_2_0, v0_4_3_0, v0_4_5_0, v0_4_6_0],
})
