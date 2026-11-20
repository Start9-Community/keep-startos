import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.14.1:0',
  releaseNotes: {
    en_US: `Updated Keep to 0.14.1.

**Security**

- Fixes a FROST signing-nonce flaw that could expose the key share when a randomness source repeats its output.
- Keep remembers each relay's certificate key on first use and refuses that relay if the key changes. Other usable relays keep working. StartOS cannot clear a remembered key; remove or replace a refused relay in Configure, updating the other group members too when changing FROST relays.
- An interrupted revoke of a NIP-46 client no longer restores its permissions on the next start. FROST signing permissions are checked again after a signing round.
- Tightens relay URL checks and adds security headers to the Web Admin.

**Changes**

- A signing round stays open while another member's owner decides on their phone.
- An unreachable relay at startup is retried in the background instead of stopping the service when other usable relays remain. With a share configured, startup still needs a usable relay in each of the FROST and bunker lists. An unreadable certificate-pin file also prevents startup. If the Web Admin cannot open, check the service logs in StartOS.
- NIP-46 requests from different clients can run concurrently.

No new vault migration; members on 0.10.0 and later still sign together.

Full release notes: [0.12.3](https://github.com/privkeyio/keep/releases/tag/v0.12.3), [0.13.0](https://github.com/privkeyio/keep/releases/tag/v0.13.0), [0.13.1](https://github.com/privkeyio/keep/releases/tag/v0.13.1), [0.13.2](https://github.com/privkeyio/keep/releases/tag/v0.13.2), [0.13.3](https://github.com/privkeyio/keep/releases/tag/v0.13.3), [0.14.0](https://github.com/privkeyio/keep/releases/tag/v0.14.0), [0.14.1](https://github.com/privkeyio/keep/releases/tag/v0.14.1)`,
    es_ES: `Actualiza Keep a 0.14.1.

**Seguridad**

- Corrige un fallo en los nonces de firma FROST que podía exponer la parte de la clave si una fuente de aleatoriedad repetía su salida.
- Keep recuerda la clave del certificado de cada relay al conectarse por primera vez y lo rechaza si la clave cambia. Los demás relays utilizables siguen funcionando. StartOS no puede borrar una clave recordada; elimina o sustituye el relay rechazado en Configure y actualiza también los otros miembros del grupo si cambias los relays FROST.
- Una revocación interrumpida de un cliente NIP-46 ya no restaura sus permisos en el siguiente inicio. Los permisos de firma FROST se comprueban de nuevo después de una ronda de firma.
- Refuerza la validación de las URL de los relays y añade cabeceras de seguridad a la Web Admin.

**Cambios**

- Una ronda de firma permanece abierta mientras el propietario de otro miembro decide en su teléfono.
- Un relay inaccesible al inicio se vuelve a comprobar en segundo plano en lugar de detener el servicio si quedan otros relays utilizables. Con una parte de clave configurada, el inicio sigue necesitando un relay utilizable en cada lista, FROST y bunker. Un archivo de claves de certificado ilegible también impide el inicio. Si la Web Admin no se abre, consulta los registros del servicio en StartOS.
- Las solicitudes NIP-46 de distintos clientes pueden ejecutarse simultáneamente.

No hay una nueva migración de la bóveda; los miembros con 0.10.0 o posterior siguen firmando juntos.

Notas de la versión completas: [0.12.3](https://github.com/privkeyio/keep/releases/tag/v0.12.3), [0.13.0](https://github.com/privkeyio/keep/releases/tag/v0.13.0), [0.13.1](https://github.com/privkeyio/keep/releases/tag/v0.13.1), [0.13.2](https://github.com/privkeyio/keep/releases/tag/v0.13.2), [0.13.3](https://github.com/privkeyio/keep/releases/tag/v0.13.3), [0.14.0](https://github.com/privkeyio/keep/releases/tag/v0.14.0), [0.14.1](https://github.com/privkeyio/keep/releases/tag/v0.14.1)`,
    de_DE: `Aktualisiert Keep auf 0.14.1.

**Sicherheit**

- Behebt einen Fehler bei FROST-Signatur-Nonces, der bei wiederholter Ausgabe einer Zufallsquelle den Schlüsselanteil offenlegen konnte.
- Keep merkt sich den Zertifikatsschlüssel jedes Relays bei der ersten Verbindung und lehnt das Relay ab, wenn sich der Schlüssel ändert. Andere nutzbare Relays arbeiten weiter. StartOS kann einen gespeicherten Schlüssel nicht löschen; entfernen oder ersetzen Sie das abgelehnte Relay in Configure und passen Sie bei geänderten FROST-Relays auch die anderen Gruppenmitglieder an.
- Ein unterbrochener Widerruf eines NIP-46-Clients stellt dessen Berechtigungen beim nächsten Start nicht mehr her. FROST-Signaturberechtigungen werden nach einer Signaturrunde erneut geprüft.
- Verschärft die Prüfung von Relay-URLs und ergänzt Sicherheitsheader für die Web Admin.

**Änderungen**

- Eine Signaturrunde bleibt offen, während der Besitzer eines anderen Mitglieds auf seinem Telefon entscheidet.
- Ein beim Start unerreichbares Relay wird im Hintergrund erneut geprüft, statt den Dienst anzuhalten, wenn andere nutzbare Relays verfügbar sind. Mit einem konfigurierten Schlüsselanteil benötigt der Start weiterhin ein nutzbares Relay in jeder der beiden Listen für FROST und Bunker. Eine unlesbare Datei mit Zertifikatsschlüsseln verhindert den Start ebenfalls. Wenn sich die Web Admin nicht öffnet, prüfen Sie die Dienstprotokolle in StartOS.
- NIP-46-Anfragen verschiedener Clients können gleichzeitig bearbeitet werden.

Keine neue Tresormigration; Mitglieder ab 0.10.0 signieren weiterhin gemeinsam.

Vollständige Versionshinweise: [0.12.3](https://github.com/privkeyio/keep/releases/tag/v0.12.3), [0.13.0](https://github.com/privkeyio/keep/releases/tag/v0.13.0), [0.13.1](https://github.com/privkeyio/keep/releases/tag/v0.13.1), [0.13.2](https://github.com/privkeyio/keep/releases/tag/v0.13.2), [0.13.3](https://github.com/privkeyio/keep/releases/tag/v0.13.3), [0.14.0](https://github.com/privkeyio/keep/releases/tag/v0.14.0), [0.14.1](https://github.com/privkeyio/keep/releases/tag/v0.14.1)`,
    pl_PL: `Aktualizuje Keep do 0.14.1.

**Bezpieczeństwo**

- Naprawia błąd nonce podpisów FROST, który mógł ujawnić udział klucza, gdy źródło losowości powtarzało wynik.
- Keep zapamiętuje klucz certyfikatu każdego przekaźnika przy pierwszym połączeniu i odrzuca przekaźnik, jeśli klucz się zmieni. Pozostałe użyteczne przekaźniki działają dalej. StartOS nie może usunąć zapamiętanego klucza; usuń lub zastąp odrzucony przekaźnik w Configure, a przy zmianie przekaźników FROST zaktualizuj także pozostałych członków grupy.
- Przerwane unieważnienie klienta NIP-46 nie przywraca już jego uprawnień przy następnym uruchomieniu. Uprawnienia do podpisywania FROST są ponownie sprawdzane po rundzie podpisu.
- Zaostrza sprawdzanie adresów URL przekaźników i dodaje nagłówki bezpieczeństwa do Web Admin.

**Zmiany**

- Runda podpisu pozostaje otwarta, gdy właściciel innego członka decyduje na swoim telefonie.
- Przekaźnik niedostępny przy starcie jest ponownie sprawdzany w tle zamiast zatrzymywać usługę, jeśli pozostają inne użyteczne przekaźniki. Gdy skonfigurowano udział klucza, start nadal wymaga użytecznego przekaźnika na każdej z list FROST i bunker. Nieczytelny plik kluczy certyfikatów również uniemożliwia start. Jeśli Web Admin się nie otwiera, sprawdź dzienniki usługi w StartOS.
- Żądania NIP-46 od różnych klientów mogą być obsługiwane jednocześnie.

Brak nowej migracji sejfu; członkowie z 0.10.0 lub nowszą nadal podpisują razem.

Pełne informacje o wydaniu: [0.12.3](https://github.com/privkeyio/keep/releases/tag/v0.12.3), [0.13.0](https://github.com/privkeyio/keep/releases/tag/v0.13.0), [0.13.1](https://github.com/privkeyio/keep/releases/tag/v0.13.1), [0.13.2](https://github.com/privkeyio/keep/releases/tag/v0.13.2), [0.13.3](https://github.com/privkeyio/keep/releases/tag/v0.13.3), [0.14.0](https://github.com/privkeyio/keep/releases/tag/v0.14.0), [0.14.1](https://github.com/privkeyio/keep/releases/tag/v0.14.1)`,
    fr_FR: `Met à jour Keep vers 0.14.1.

**Sécurité**

- Corrige une faille des nonces de signature FROST qui pouvait exposer la part de clé si une source d'aléa répétait sa sortie.
- Keep mémorise la clé du certificat de chaque relais à la première connexion et refuse ce relais si la clé change. Les autres relais utilisables continuent de fonctionner. StartOS ne peut pas effacer une clé mémorisée ; supprimez ou remplacez le relais refusé dans Configure et mettez aussi à jour les autres membres du groupe si vous changez les relais FROST.
- Une révocation interrompue d'un client NIP-46 ne rétablit plus ses autorisations au démarrage suivant. Les autorisations de signature FROST sont revérifiées après une ronde de signature.
- Renforce la validation des URL des relais et ajoute des en-têtes de sécurité à la Web Admin.

**Changements**

- Une ronde de signature reste ouverte pendant que le propriétaire d'un autre membre décide sur son téléphone.
- Un relais inaccessible au démarrage est revérifié en arrière-plan au lieu d'arrêter le service si d'autres relais utilisables restent disponibles. Avec une part de clé configurée, le démarrage nécessite toujours un relais utilisable dans chacune des listes FROST et bunker. Un fichier de clés de certificats illisible empêche aussi le démarrage. Si la Web Admin ne s'ouvre pas, consultez les journaux du service dans StartOS.
- Les requêtes NIP-46 de différents clients peuvent être traitées simultanément.

Aucune nouvelle migration du coffre ; les membres en 0.10.0 ou ultérieure signent toujours ensemble.

Notes de version complètes : [0.12.3](https://github.com/privkeyio/keep/releases/tag/v0.12.3), [0.13.0](https://github.com/privkeyio/keep/releases/tag/v0.13.0), [0.13.1](https://github.com/privkeyio/keep/releases/tag/v0.13.1), [0.13.2](https://github.com/privkeyio/keep/releases/tag/v0.13.2), [0.13.3](https://github.com/privkeyio/keep/releases/tag/v0.13.3), [0.14.0](https://github.com/privkeyio/keep/releases/tag/v0.14.0), [0.14.1](https://github.com/privkeyio/keep/releases/tag/v0.14.1)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
