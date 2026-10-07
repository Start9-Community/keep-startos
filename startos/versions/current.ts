import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.7.5:3',
  releaseNotes: {
    en_US: `Updated Keep to 0.7.5.

- Adds coercion resistance: a duress beacon can freeze co-signing on a compromised holder.
- Protects replicated vault state against replay and rollback.
- Hardens secret handling in memory and fails closed on unverifiable attestation evidence.
- No change to the on-disk vault format; existing vaults and passwords carry over unchanged.

Full release notes: https://github.com/privkeyio/keep/compare/v0.5.0...v0.7.5

- Set Web Admin Password asks for confirmation before replacing an existing password.
- The relay address error in Configure is shown in your language.`,
    es_ES: `Actualiza Keep a 0.7.5.

- Añade resistencia a la coacción: una baliza de coacción puede congelar la cofirma en un participante comprometido.
- Protege el estado replicado de la bóveda frente a reenvíos y reversiones.
- Refuerza el manejo de secretos en memoria y falla de forma segura ante pruebas de atestación no verificables.
- No cambia el formato de la bóveda en disco; las bóvedas y contraseñas existentes se conservan sin cambios.

Notas de la versión completas: https://github.com/privkeyio/keep/compare/v0.5.0...v0.7.5

- Establecer la contraseña de administración web pide confirmación antes de reemplazar una contraseña existente.
- El error de dirección de relé en Configurar se muestra en tu idioma.`,
    de_DE: `Aktualisiert Keep auf 0.7.5.

- Ergänzt Schutz vor Nötigung: Ein Duress-Signal kann das Mitsignieren auf einem kompromittierten Anteilseigner einfrieren.
- Schützt den replizierten Tresorzustand vor Wiedereinspielung und Rücksetzung.
- Härtet den Umgang mit Geheimnissen im Speicher und verweigert den Betrieb bei nicht überprüfbaren Attestierungsnachweisen.
- Keine Änderung am Tresorformat auf der Festplatte; vorhandene Tresore und Passwörter bleiben unverändert nutzbar.

Vollständige Versionshinweise: https://github.com/privkeyio/keep/compare/v0.5.0...v0.7.5

- „Web-Administrationspasswort festlegen“ fragt vor dem Ersetzen eines vorhandenen Passworts nach einer Bestätigung.
- Die Fehlermeldung zur Relay-Adresse in „Konfigurieren“ wird in Ihrer Sprache angezeigt.`,
    pl_PL: `Aktualizuje Keep do 0.7.5.

- Dodaje odporność na przymus: sygnał alarmowy może zamrozić współpodpisywanie na przejętym węźle.
- Chroni replikowany stan sejfu przed powtórzeniem i cofnięciem.
- Wzmacnia obsługę sekretów w pamięci i bezpiecznie odmawia działania przy niemożliwych do zweryfikowania dowodach atestacji.
- Bez zmian formatu sejfu na dysku; istniejące sejfy i hasła działają bez zmian.

Pełne informacje o wydaniu: https://github.com/privkeyio/keep/compare/v0.5.0...v0.7.5

- „Ustaw hasło panelu administracyjnego” prosi o potwierdzenie przed zastąpieniem istniejącego hasła.
- Błąd adresu przekaźnika w „Konfiguruj” jest wyświetlany w Twoim języku.`,
    fr_FR: `Met à jour Keep vers 0.7.5.

- Ajoute une résistance à la contrainte : une balise de contrainte peut geler la cosignature sur un détenteur compromis.
- Protège l'état répliqué du coffre contre le rejeu et la restauration d'un état antérieur.
- Renforce la gestion des secrets en mémoire et refuse de fonctionner en cas de preuve d'attestation non vérifiable.
- Aucun changement du format du coffre sur disque ; les coffres et mots de passe existants restent inchangés.

Notes de version complètes : https://github.com/privkeyio/keep/compare/v0.5.0...v0.7.5

- Définir le mot de passe d'administration web demande une confirmation avant de remplacer un mot de passe existant.
- L'erreur d'adresse de relais dans Configurer s'affiche dans votre langue.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
