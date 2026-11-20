import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.14.0:0',
  releaseNotes: {
    en_US: `Updated Keep to 0.14.0.

**Security**

- Fixes a FROST nonce flaw: a randomness source that replayed the same bytes could make Keep commit to the same signing nonce in two sessions, and nonce reuse can expose the key share. Every nonce draw is now mixed with a counter, the process id and the clock, so a replayed sequence no longer repeats a nonce.
- Keep now remembers each relay's certificate key the first time it connects and refuses that relay if the key later changes. A refusal is listed in the Web Admin's signing log.
- An interrupted revoke of a NIP-46 client no longer lets that client's permissions come back on the next start.

**Changes**

- A signing round now stays open while another member's owner is still deciding on their phone, instead of timing out under them.

The vault is not migrated, and members on 0.10.0 and later still sign together.

Full release notes: [0.12.3](https://github.com/privkeyio/keep/releases/tag/v0.12.3), [0.13.0](https://github.com/privkeyio/keep/releases/tag/v0.13.0), [0.13.1](https://github.com/privkeyio/keep/releases/tag/v0.13.1), [0.13.2](https://github.com/privkeyio/keep/releases/tag/v0.13.2), [0.13.3](https://github.com/privkeyio/keep/releases/tag/v0.13.3), [0.14.0](https://github.com/privkeyio/keep/releases/tag/v0.14.0)`,
    es_ES: `Actualiza Keep a 0.14.0.

**Seguridad**

- Corrige un fallo en los nonces FROST: una fuente de aleatoriedad que repetía los mismos bytes podía hacer que Keep se comprometiera con el mismo nonce de firma en dos sesiones, y reutilizar un nonce puede exponer la parte de la clave. Ahora cada nonce se mezcla con un contador, el id del proceso y el reloj, de modo que una secuencia repetida ya no repite un nonce.
- Keep recuerda ahora la clave del certificado de cada relay la primera vez que se conecta y rechaza ese relay si la clave cambia después. Cada rechazo aparece en el registro de firmas de la Web Admin.
- Una revocación interrumpida de un cliente NIP-46 ya no permite que los permisos de ese cliente vuelvan en el siguiente inicio.

**Cambios**

- Una ronda de firma permanece abierta mientras el propietario de otro miembro aún decide en su teléfono, en lugar de agotar el tiempo.

La bóveda no se migra, y los miembros con 0.10.0 o posterior siguen firmando juntos.

Notas de la versión completas: [0.12.3](https://github.com/privkeyio/keep/releases/tag/v0.12.3), [0.13.0](https://github.com/privkeyio/keep/releases/tag/v0.13.0), [0.13.1](https://github.com/privkeyio/keep/releases/tag/v0.13.1), [0.13.2](https://github.com/privkeyio/keep/releases/tag/v0.13.2), [0.13.3](https://github.com/privkeyio/keep/releases/tag/v0.13.3), [0.14.0](https://github.com/privkeyio/keep/releases/tag/v0.14.0)`,
    de_DE: `Aktualisiert Keep auf 0.14.0.

**Sicherheit**

- Behebt einen Fehler bei FROST-Nonces: Eine Zufallsquelle, die dieselben Bytes wiederholte, konnte Keep in zwei Sitzungen auf dieselbe Signatur-Nonce festlegen, und eine wiederverwendete Nonce kann den Schlüsselanteil offenlegen. Jede Nonce wird jetzt mit einem Zähler, der Prozess-ID und der Uhrzeit gemischt, sodass eine wiederholte Folge keine Nonce mehr wiederholt.
- Keep merkt sich jetzt den Zertifikatsschlüssel jedes Relays bei der ersten Verbindung und lehnt das Relay ab, wenn sich der Schlüssel später ändert. Jede Ablehnung steht im Signaturprotokoll der Web Admin.
- Ein unterbrochener Widerruf eines NIP-46-Clients lässt dessen Berechtigungen beim nächsten Start nicht mehr zurückkehren.

**Änderungen**

- Eine Signaturrunde bleibt offen, solange der Besitzer eines anderen Mitglieds noch auf seinem Telefon entscheidet, statt abzulaufen.

Der Tresor wird nicht migriert, und Mitglieder ab 0.10.0 signieren weiterhin gemeinsam.

Vollständige Versionshinweise: [0.12.3](https://github.com/privkeyio/keep/releases/tag/v0.12.3), [0.13.0](https://github.com/privkeyio/keep/releases/tag/v0.13.0), [0.13.1](https://github.com/privkeyio/keep/releases/tag/v0.13.1), [0.13.2](https://github.com/privkeyio/keep/releases/tag/v0.13.2), [0.13.3](https://github.com/privkeyio/keep/releases/tag/v0.13.3), [0.14.0](https://github.com/privkeyio/keep/releases/tag/v0.14.0)`,
    pl_PL: `Aktualizuje Keep do 0.14.0.

**Bezpieczeństwo**

- Naprawia błąd nonce FROST: źródło losowości powtarzające te same bajty mogło sprawić, że Keep zobowiązywał się do tego samego nonce podpisu w dwóch sesjach, a ponowne użycie nonce może ujawnić udział klucza. Każde losowanie nonce jest teraz mieszane z licznikiem, identyfikatorem procesu i zegarem, więc powtórzona sekwencja nie powtarza już nonce.
- Keep zapamiętuje teraz klucz certyfikatu każdego przekaźnika przy pierwszym połączeniu i odrzuca ten przekaźnik, jeśli klucz później się zmieni. Każde odrzucenie widać w dzienniku podpisów w Web Admin.
- Przerwane unieważnienie klienta NIP-46 nie pozwala już, by uprawnienia tego klienta wróciły przy następnym uruchomieniu.

**Zmiany**

- Runda podpisu pozostaje otwarta, dopóki właściciel innego członka jeszcze decyduje na swoim telefonie, zamiast wygasać.

Sejf nie jest migrowany, a członkowie z 0.10.0 lub nowszą nadal podpisują razem.

Pełne informacje o wydaniu: [0.12.3](https://github.com/privkeyio/keep/releases/tag/v0.12.3), [0.13.0](https://github.com/privkeyio/keep/releases/tag/v0.13.0), [0.13.1](https://github.com/privkeyio/keep/releases/tag/v0.13.1), [0.13.2](https://github.com/privkeyio/keep/releases/tag/v0.13.2), [0.13.3](https://github.com/privkeyio/keep/releases/tag/v0.13.3), [0.14.0](https://github.com/privkeyio/keep/releases/tag/v0.14.0)`,
    fr_FR: `Met à jour Keep vers 0.14.0.

**Sécurité**

- Corrige une faille des nonces FROST : une source d'aléa qui rejouait les mêmes octets pouvait amener Keep à s'engager sur le même nonce de signature dans deux sessions, et la réutilisation d'un nonce peut exposer la part de clé. Chaque tirage de nonce est désormais mélangé à un compteur, à l'identifiant du processus et à l'horloge, si bien qu'une séquence rejouée ne répète plus de nonce.
- Keep mémorise désormais la clé du certificat de chaque relais à la première connexion et refuse ce relais si la clé change ensuite. Chaque refus apparaît dans le journal de signature de la Web Admin.
- Une révocation interrompue d'un client NIP-46 ne permet plus aux autorisations de ce client de revenir au démarrage suivant.

**Changements**

- Une ronde de signature reste ouverte tant que le propriétaire d'un autre membre décide encore sur son téléphone, au lieu d'expirer.

Le coffre n'est pas migré, et les membres en 0.10.0 ou ultérieure signent toujours ensemble.

Notes de version complètes : [0.12.3](https://github.com/privkeyio/keep/releases/tag/v0.12.3), [0.13.0](https://github.com/privkeyio/keep/releases/tag/v0.13.0), [0.13.1](https://github.com/privkeyio/keep/releases/tag/v0.13.1), [0.13.2](https://github.com/privkeyio/keep/releases/tag/v0.13.2), [0.13.3](https://github.com/privkeyio/keep/releases/tag/v0.13.3), [0.14.0](https://github.com/privkeyio/keep/releases/tag/v0.14.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
