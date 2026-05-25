import { sdk } from '../sdk'
import { i18n } from '../i18n'
import { storeJson } from '../fileModels/store.json'
import { defaultBunkerRelay, defaultFrostRelay } from '../utils'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  bunkerRelay: Value.text({
    name: i18n('Bunker Relay'),
    description: i18n(
      'Relay used for the NIP-46 bunker (where Nostr clients reach this signer)',
    ),
    required: true,
    default: defaultBunkerRelay,
  }),
  frostRelay: Value.text({
    name: i18n('FROST Relay'),
    description: i18n(
      'Relay used to coordinate FROST signing rounds with your other devices',
    ),
    required: true,
    default: defaultFrostRelay,
  }),
  frostGroup: Value.text({
    name: i18n('Group (npub)'),
    description: i18n(
      'Optional: the FROST group to co-sign for. Leave blank to auto-detect from the imported share.',
    ),
    required: false,
    default: null,
  }),
  autoApprove: Value.toggle({
    name: i18n('Auto co-sign'),
    description: i18n(
      'Automatically participate in signing rounds within policy (turn off as a kill switch)',
    ),
    default: true,
  }),
})

export const configure = sdk.Action.withInput(
  'configure',
  async ({ effects }) => ({
    name: i18n('Configure'),
    description: i18n(
      'Configure the relays and policy for the FROST co-signer',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  inputSpec,
  async ({ effects }) => {
    const s = await storeJson.read().once()
    return {
      bunkerRelay: s?.bunkerRelay ?? defaultBunkerRelay,
      frostRelay: s?.frostRelay ?? defaultFrostRelay,
      frostGroup: s?.frostGroup || null,
      autoApprove: s?.autoApprove ?? true,
    }
  },
  async ({ effects, input }) => {
    await storeJson.merge(effects, {
      bunkerRelay: input.bunkerRelay,
      frostRelay: input.frostRelay,
      frostGroup: input.frostGroup ?? '',
      autoApprove: input.autoApprove,
    })
    await effects.restart()
    return {
      version: '1' as const,
      title: i18n('Configuration saved'),
      message: i18n('The service is restarting with the new settings.'),
      result: null,
    }
  },
)
