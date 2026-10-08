import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.11.0:0',
  releaseNotes: {
    en_US: `Updated Keep to 0.11.0.

- A co-signer whose signature share completes a signature now sends it, so the member that asked no longer waits out the round and fails.
- Sign requests whose participants repeat a member, leave out the member that asked, or do not match the group's threshold are refused and logged.
- A key generation (DKG) no longer times out for the member that reaches a round last.
- A long audit log no longer stops the vault from unlocking.
- Members on 0.10.0 and 0.11.0 sign together. Keep on StartOS refuses requests to spend the group's own Bitcoin outputs; those are signed with the Keep CLI on members that opt in.
- Set Web Admin Password now asks before replacing an existing password, and the relay address error in Configure is shown in your language.

If you are updating from 0.7.5, this also brings Keep 0.10.0, a security release that changes the FROST signing protocol:
- Every member of a signing group must upgrade together: Keep 0.10.0 cannot sign with members still on an earlier version, and its event log names any such member.
- Each member's network identity now comes from its secret share instead of public data, so outsiders can no longer read a group's signing traffic or send messages as a member.
- Every peer is checked against the group's verifying shares before it is admitted.
- Existing vaults and their FROST shares open unchanged. Shares written by 0.10.0 cannot be read by earlier versions, so this update cannot be rolled back.

Full release notes: https://github.com/privkeyio/keep/releases/tag/v0.11.0`,
    es_ES: `Actualiza Keep a 0.11.0.

- Un cofirmante cuya parte de firma completa una firma ahora la envía, de modo que el miembro que la pidió ya no agota la ronda y falla.
- Las solicitudes de firma cuyos participantes repiten un miembro, omiten al miembro que la pidió o no coinciden con el umbral del grupo se rechazan y se registran.
- Una generación de claves (DKG) ya no agota el tiempo para el miembro que llega último a una ronda.
- Un registro de auditoría largo ya no impide desbloquear la bóveda.
- Los miembros con 0.10.0 y 0.11.0 firman juntos. Keep en StartOS rechaza las solicitudes de gastar las salidas de Bitcoin propias del grupo; esas se firman con la CLI de Keep en los miembros que lo permiten.
- Establecer la contraseña de administrador web ahora pregunta antes de reemplazar una contraseña existente, y el error de dirección de relé en Configurar se muestra en tu idioma.

Si actualizas desde 0.7.5, esto incluye también Keep 0.10.0, una versión de seguridad que cambia el protocolo de firma FROST:
- Todos los miembros de un grupo de firma deben actualizar a la vez: Keep 0.10.0 no puede firmar con miembros que sigan en una versión anterior, y su registro de eventos indica cuáles son.
- La identidad de red de cada miembro se deriva ahora de su fragmento secreto en lugar de datos públicos, de modo que terceros ya no pueden leer el tráfico de firma del grupo ni enviar mensajes en nombre de un miembro.
- Cada participante se comprueba con los fragmentos de verificación del grupo antes de admitirlo.
- Las bóvedas existentes y sus fragmentos FROST se abren sin cambios. Los fragmentos que escribe 0.10.0 no pueden leerse con versiones anteriores, por lo que esta actualización no puede revertirse.

Notas de la versión completas: https://github.com/privkeyio/keep/releases/tag/v0.11.0`,
    de_DE: `Aktualisiert Keep auf 0.11.0.

- Ein Mitsignierer, dessen Signaturanteil eine Signatur vervollständigt, sendet ihn jetzt, sodass das anfragende Mitglied die Runde nicht mehr bis zum Timeout abwartet und scheitert.
- Signaturanfragen, deren Teilnehmer ein Mitglied wiederholen, das anfragende Mitglied auslassen oder nicht der Schwelle der Gruppe entsprechen, werden abgelehnt und protokolliert.
- Eine Schlüsselerzeugung (DKG) läuft für das Mitglied, das eine Runde zuletzt erreicht, nicht mehr in einen Timeout.
- Ein langes Audit-Protokoll verhindert das Entsperren des Tresors nicht mehr.
- Mitglieder mit 0.10.0 und 0.11.0 signieren gemeinsam. Keep auf StartOS lehnt Anfragen ab, die eigenen Bitcoin-Ausgaben der Gruppe auszugeben; diese werden mit der Keep-CLI auf Mitgliedern signiert, die dem zustimmen.
- Web-Admin-Passwort festlegen fragt jetzt nach, bevor ein vorhandenes Passwort ersetzt wird, und die Fehlermeldung zur Relay-Adresse in Konfigurieren erscheint in Ihrer Sprache.

Wenn Sie von 0.7.5 aktualisieren, enthält dies auch Keep 0.10.0, ein Sicherheitsrelease, das das FROST-Signaturprotokoll ändert:
- Alle Mitglieder einer Signaturgruppe müssen gemeinsam aktualisieren: Keep 0.10.0 kann nicht mit Mitgliedern signieren, die noch eine frühere Version verwenden, und nennt solche Mitglieder im Ereignisprotokoll.
- Die Netzwerkidentität jedes Mitglieds wird nun aus seinem geheimen Anteil statt aus öffentlichen Daten abgeleitet, sodass Außenstehende den Signaturverkehr einer Gruppe nicht mehr mitlesen oder Nachrichten im Namen eines Mitglieds senden können.
- Jeder Teilnehmer wird vor der Aufnahme mit den Verifikationsanteilen der Gruppe abgeglichen.
- Vorhandene Tresore und ihre FROST-Anteile lassen sich unverändert öffnen. Von 0.10.0 geschriebene Anteile können frühere Versionen nicht lesen, daher lässt sich dieses Update nicht zurücknehmen.

Vollständige Versionshinweise: https://github.com/privkeyio/keep/releases/tag/v0.11.0`,
    pl_PL: `Aktualizuje Keep do 0.11.0.

- Współpodpisujący, którego udział w podpisie uzupełnia podpis, teraz go wysyła, więc członek, który poprosił o podpis, nie czeka już do końca rundy i nie kończy się błędem.
- Żądania podpisu, których uczestnicy powtarzają członka, pomijają członka proszącego o podpis lub nie odpowiadają progowi grupy, są odrzucane i rejestrowane.
- Generowanie kluczy (DKG) nie przekracza już limitu czasu dla członka, który dociera do rundy jako ostatni.
- Długi dziennik audytu nie blokuje już odblokowania sejfu.
- Członkowie z 0.10.0 i 0.11.0 podpisują razem. Keep na StartOS odrzuca żądania wydania własnych wyjść Bitcoin grupy; podpisuje się je za pomocą Keep CLI u członków, którzy na to zezwalają.
- Ustawienie hasła administratora sieciowego pyta teraz przed zastąpieniem istniejącego hasła, a błąd adresu przekaźnika w Konfiguracji jest wyświetlany w Twoim języku.

Jeśli aktualizujesz z 0.7.5, obejmuje to również Keep 0.10.0, wydanie bezpieczeństwa zmieniające protokół podpisów FROST:
- Wszyscy członkowie grupy podpisującej muszą zaktualizować jednocześnie: Keep 0.10.0 nie może podpisywać z członkami, którzy nadal używają wcześniejszej wersji, a dziennik zdarzeń wskazuje takich członków.
- Tożsamość sieciowa każdego członka pochodzi teraz z jego tajnego udziału zamiast z danych publicznych, więc osoby z zewnątrz nie mogą już odczytywać ruchu podpisującego grupy ani wysyłać wiadomości w imieniu członka.
- Każdy uczestnik jest sprawdzany względem udziałów weryfikujących grupy przed dopuszczeniem.
- Istniejące sejfy i ich udziały FROST otwierają się bez zmian. Udziałów zapisanych przez 0.10.0 nie odczytają wcześniejsze wersje, więc tej aktualizacji nie można cofnąć.

Pełne informacje o wydaniu: https://github.com/privkeyio/keep/releases/tag/v0.11.0`,
    fr_FR: `Met à jour Keep vers 0.11.0.

- Un cosignataire dont la part de signature complète une signature l'envoie désormais : le membre qui l'a demandée n'attend plus la fin de la manche pour échouer.
- Les demandes de signature dont les participants répètent un membre, omettent le membre demandeur ou ne correspondent pas au seuil du groupe sont refusées et journalisées.
- Une génération de clés (DKG) n'expire plus pour le membre qui atteint une manche en dernier.
- Un long journal d'audit n'empêche plus de déverrouiller le coffre.
- Les membres en 0.10.0 et en 0.11.0 signent ensemble. Keep sur StartOS refuse les demandes de dépense des sorties Bitcoin propres au groupe ; elles se signent avec la CLI Keep sur les membres qui l'acceptent.
- Définir le mot de passe administrateur web demande désormais confirmation avant de remplacer un mot de passe existant, et l'erreur d'adresse de relais dans Configurer s'affiche dans votre langue.

Si vous mettez à jour depuis 0.7.5, cela inclut aussi Keep 0.10.0, une version de sécurité qui modifie le protocole de signature FROST :
- Tous les membres d'un groupe de signature doivent mettre à jour en même temps : Keep 0.10.0 ne peut pas signer avec des membres restés sur une version antérieure, et son journal d'événements les signale.
- L'identité réseau de chaque membre est désormais dérivée de sa part secrète plutôt que de données publiques : un tiers ne peut plus lire le trafic de signature d'un groupe ni envoyer de messages au nom d'un membre.
- Chaque participant est vérifié par rapport aux parts de vérification du groupe avant d'être admis.
- Les coffres existants et leurs parts FROST s'ouvrent sans changement. Les parts écrites par 0.10.0 ne peuvent pas être lues par les versions antérieures, cette mise à jour ne peut donc pas être annulée.

Notes de version complètes : https://github.com/privkeyio/keep/releases/tag/v0.11.0`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
