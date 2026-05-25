import { sdk } from '../sdk'
import { i18n } from '../i18n'
import { storeJson } from '../fileModels/store.json'
import { defaultBunkerRelay, defaultFrostRelay } from '../utils'

const { InputSpec, Value, List } = sdk

const relayPattern = {
  regex: '^wss://.+',
  description: 'Relay URLs must start with wss://',
}

const inputSpec = InputSpec.of({
  bunkerRelays: Value.list(
    List.text(
      {
        name: i18n('Bunker Relays'),
        description: i18n(
          'Relays used for the NIP-46 bunker (where Nostr clients reach this signer)',
        ),
        default: [defaultBunkerRelay],
      },
      { patterns: [relayPattern], placeholder: 'wss://nos.lol' },
    ),
  ),
  frostRelays: Value.list(
    List.text(
      {
        name: i18n('FROST Relays'),
        description: i18n(
          'Relays used to coordinate FROST signing rounds with your other devices. These must match the relays your other share-holders use.',
        ),
        default: [defaultFrostRelay],
      },
      { patterns: [relayPattern], placeholder: 'wss://nos.lol' },
    ),
  ),
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
    description: i18n('Configure the relays and policy for the FROST co-signer'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  inputSpec,
  async ({ effects }) => {
    const s = await storeJson.read().once()
    return {
      bunkerRelays: s?.bunkerRelays ?? [defaultBunkerRelay],
      frostRelays: s?.frostRelays ?? [defaultFrostRelay],
      frostGroup: s?.frostGroup || null,
      autoApprove: s?.autoApprove ?? true,
    }
  },
  async ({ effects, input }) => {
    await storeJson.merge(effects, {
      bunkerRelays: input.bunkerRelays,
      frostRelays: input.frostRelays,
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
