import { sdk } from '../sdk'
import { i18n } from '../i18n'
import { storeJson } from '../fileModels/store.json'
import { defaultRelays, maxRelays, maxRelayUrlLength } from '../utils'

const { InputSpec, Value, List } = sdk

// Mirror upstream keep-core `validate_relay_url`'s key rules: wss:// scheme, a
// non-empty host, and no whitespace or userinfo (a malformed relay would crash
// the co-signer when keep-web calls add_relay). Private/loopback hosts can't be
// caught in a regex; upstream rejects those at connect time.
const relayPattern = {
  regex: '^wss://[^\\s@]+$',
  description: 'Must be a wss:// relay URL with no spaces, e.g. wss://relay.example.com',
}

const inputSpec = InputSpec.of({
  bunkerRelays: Value.list(
    List.text(
      {
        name: i18n('Bunker Relays'),
        description: i18n(
          'Relays used for the NIP-46 bunker (where Nostr clients reach this signer). At least one is required.',
        ),
        default: defaultRelays,
        minLength: 1,
        maxLength: maxRelays,
      },
      {
        patterns: [relayPattern],
        placeholder: 'wss://bucket.coracle.social',
        maxLength: maxRelayUrlLength,
      },
    ),
  ),
  frostRelays: Value.list(
    List.text(
      {
        name: i18n('FROST Relays'),
        description: i18n(
          'Relays used to coordinate FROST signing rounds with your other devices. These must match the relays your other share-holders use. At least one is required.',
        ),
        default: defaultRelays,
        minLength: 1,
        maxLength: maxRelays,
      },
      {
        patterns: [relayPattern],
        placeholder: 'wss://bucket.coracle.social',
        maxLength: maxRelayUrlLength,
      },
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
})

export const configure = sdk.Action.withInput(
  'configure',
  async ({ effects }) => ({
    name: i18n('Configure'),
    description: i18n('Configure the relays and group for the FROST co-signer'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  inputSpec,
  async ({ effects }) => {
    const s = await storeJson.read().once()
    return {
      bunkerRelays: s?.bunkerRelays?.length ? s.bunkerRelays : defaultRelays,
      frostRelays: s?.frostRelays?.length ? s.frostRelays : defaultRelays,
      frostGroup: s?.frostGroup || null,
    }
  },
  async ({ effects, input }) => {
    await storeJson.merge(effects, {
      bunkerRelays: input.bunkerRelays,
      frostRelays: input.frostRelays,
      frostGroup: input.frostGroup ?? '',
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
