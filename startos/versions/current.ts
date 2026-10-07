import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.10.0:0',
  releaseNotes: {
    en_US: `Updated Keep to 0.10.0, a security release that changes the FROST signing protocol.

- Every member of a signing group must upgrade together: Keep 0.10.0 cannot sign with members still on an earlier version, and its event log names any such member.
- Each member's network identity now comes from its secret share instead of public data, so outsiders can no longer read a group's signing traffic or send messages as a member.
- Every peer is checked against the group's verifying shares before it is admitted.
- Existing vaults and their FROST shares open unchanged. Shares written by 0.10.0 cannot be read by earlier versions, so this update cannot be rolled back.

Full release notes: https://github.com/privkeyio/keep/releases/tag/v0.10.0`,
    es_ES: `Actualiza Keep a 0.10.0, una versión de seguridad que cambia el protocolo de firma FROST.

- Todos los miembros de un grupo de firma deben actualizar a la vez: Keep 0.10.0 no puede firmar con miembros que sigan en una versión anterior, y su registro de eventos indica cuáles son.
- La identidad de red de cada miembro se deriva ahora de su fragmento secreto en lugar de datos públicos, de modo que terceros ya no pueden leer el tráfico de firma del grupo ni enviar mensajes en nombre de un miembro.
- Cada participante se comprueba con los fragmentos de verificación del grupo antes de admitirlo.
- Las bóvedas existentes y sus fragmentos FROST se abren sin cambios. Los fragmentos que escribe 0.10.0 no pueden leerse con versiones anteriores, por lo que esta actualización no puede revertirse.

Notas de la versión completas: https://github.com/privkeyio/keep/releases/tag/v0.10.0`,
    de_DE: `Aktualisiert Keep auf 0.10.0, ein Sicherheitsrelease, das das FROST-Signaturprotokoll ändert.

- Alle Mitglieder einer Signaturgruppe müssen gemeinsam aktualisieren: Keep 0.10.0 kann nicht mit Mitgliedern signieren, die noch eine frühere Version verwenden, und nennt solche Mitglieder im Ereignisprotokoll.
- Die Netzwerkidentität jedes Mitglieds wird nun aus seinem geheimen Anteil statt aus öffentlichen Daten abgeleitet, sodass Außenstehende den Signaturverkehr einer Gruppe nicht mehr mitlesen oder Nachrichten im Namen eines Mitglieds senden können.
- Jeder Teilnehmer wird vor der Aufnahme mit den Verifikationsanteilen der Gruppe abgeglichen.
- Vorhandene Tresore und ihre FROST-Anteile lassen sich unverändert öffnen. Von 0.10.0 geschriebene Anteile können frühere Versionen nicht lesen, daher lässt sich dieses Update nicht zurücknehmen.

Vollständige Versionshinweise: https://github.com/privkeyio/keep/releases/tag/v0.10.0`,
    pl_PL: `Aktualizuje Keep do 0.10.0, wydania bezpieczeństwa zmieniającego protokół podpisów FROST.

- Wszyscy członkowie grupy podpisującej muszą zaktualizować jednocześnie: Keep 0.10.0 nie może podpisywać z członkami, którzy nadal używają wcześniejszej wersji, a dziennik zdarzeń wskazuje takich członków.
- Tożsamość sieciowa każdego członka pochodzi teraz z jego tajnego udziału zamiast z danych publicznych, więc osoby z zewnątrz nie mogą już odczytywać ruchu podpisującego grupy ani wysyłać wiadomości w imieniu członka.
- Każdy uczestnik jest sprawdzany względem udziałów weryfikujących grupy przed dopuszczeniem.
- Istniejące sejfy i ich udziały FROST otwierają się bez zmian. Udziałów zapisanych przez 0.10.0 nie odczytają wcześniejsze wersje, więc tej aktualizacji nie można cofnąć.

Pełne informacje o wydaniu: https://github.com/privkeyio/keep/releases/tag/v0.10.0`,
    fr_FR: `Met à jour Keep vers 0.10.0, une version de sécurité qui modifie le protocole de signature FROST.

- Tous les membres d'un groupe de signature doivent mettre à jour en même temps : Keep 0.10.0 ne peut pas signer avec des membres restés sur une version antérieure, et son journal d'événements les signale.
- L'identité réseau de chaque membre est désormais dérivée de sa part secrète plutôt que de données publiques : un tiers ne peut plus lire le trafic de signature d'un groupe ni envoyer de messages au nom d'un membre.
- Chaque participant est vérifié par rapport aux parts de vérification du groupe avant d'être admis.
- Les coffres existants et leurs parts FROST s'ouvrent sans changement. Les parts écrites par 0.10.0 ne peuvent pas être lues par les versions antérieures, cette mise à jour ne peut donc pas être annulée.

Notes de version complètes : https://github.com/privkeyio/keep/releases/tag/v0.10.0`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
