import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.2:0',
  releaseNotes: {
    en_US: `Updated Keep to 0.12.2.

- Stops trusting certificates from a compromised certificate authority (eMudhra).
- The NIP-46 bunker no longer auto-approves the event kinds a client names when it connects, denies an approval that goes unanswered, and stops serving a client once it is revoked.
- FROST wallets with four or more recovery tiers can now be set up.
- Keep upgrades the vault the first time 0.12.2 opens it, and earlier versions cannot open it afterwards, so this update cannot be rolled back.
- Members on 0.10.0 and later sign together.

If you are updating from 0.7.5, this also brings Keep 0.10.0, which changes the FROST signing protocol: every member of a signing group must upgrade together, because 0.10.0 and later cannot sign with members on an earlier version.

Full release notes: https://github.com/privkeyio/keep/releases/tag/v0.12.2`,
    es_ES: `Actualiza Keep a 0.12.2.

- Deja de confiar en los certificados de una autoridad de certificación comprometida (eMudhra).
- El búnker NIP-46 ya no aprueba automáticamente los tipos de evento que un cliente indica al conectarse, rechaza una aprobación que queda sin respuesta y deja de atender a un cliente en cuanto se revoca.
- Ahora se pueden configurar carteras FROST con cuatro o más niveles de recuperación.
- Keep actualiza la bóveda la primera vez que 0.12.2 la abre, y las versiones anteriores ya no pueden abrirla, por lo que esta actualización no puede revertirse.
- Los miembros con 0.10.0 o posterior firman juntos.

Si actualizas desde 0.7.5, esto incluye también Keep 0.10.0, que cambia el protocolo de firma FROST: todos los miembros de un grupo de firma deben actualizar a la vez, porque 0.10.0 y posteriores no pueden firmar con miembros que sigan en una versión anterior.

Notas de la versión completas: https://github.com/privkeyio/keep/releases/tag/v0.12.2`,
    de_DE: `Aktualisiert Keep auf 0.12.2.

- Vertraut Zertifikaten einer kompromittierten Zertifizierungsstelle (eMudhra) nicht mehr.
- Der NIP-46-Bunker genehmigt die Ereignisarten, die ein Client beim Verbinden nennt, nicht mehr automatisch, lehnt eine unbeantwortete Genehmigung ab und bedient einen Client nicht mehr, sobald er widerrufen ist.
- FROST-Wallets mit vier oder mehr Wiederherstellungsstufen lassen sich jetzt einrichten.
- Keep aktualisiert den Tresor, wenn 0.12.2 ihn zum ersten Mal öffnet, und frühere Versionen können ihn danach nicht mehr öffnen, daher lässt sich dieses Update nicht zurücknehmen.
- Mitglieder ab 0.10.0 signieren gemeinsam.

Wenn Sie von 0.7.5 aktualisieren, enthält dies auch Keep 0.10.0, das das FROST-Signaturprotokoll ändert: Alle Mitglieder einer Signaturgruppe müssen gemeinsam aktualisieren, da 0.10.0 und neuer nicht mit Mitgliedern signieren können, die noch eine frühere Version verwenden.

Vollständige Versionshinweise: https://github.com/privkeyio/keep/releases/tag/v0.12.2`,
    pl_PL: `Aktualizuje Keep do 0.12.2.

- Przestaje ufać certyfikatom przejętego urzędu certyfikacji (eMudhra).
- Bunkier NIP-46 nie zatwierdza już automatycznie rodzajów zdarzeń, które klient wskazuje przy połączeniu, odrzuca zatwierdzenie pozostawione bez odpowiedzi i przestaje obsługiwać klienta, gdy zostanie on unieważniony.
- Można teraz skonfigurować portfele FROST z czterema lub więcej poziomami odzyskiwania.
- Keep aktualizuje sejf przy pierwszym otwarciu przez 0.12.2, a wcześniejsze wersje nie mogą go potem otworzyć, więc tej aktualizacji nie można cofnąć.
- Członkowie z 0.10.0 lub nowszą podpisują razem.

Jeśli aktualizujesz z 0.7.5, obejmuje to również Keep 0.10.0, które zmienia protokół podpisów FROST: wszyscy członkowie grupy podpisującej muszą zaktualizować jednocześnie, ponieważ 0.10.0 i nowsze nie mogą podpisywać z członkami, którzy nadal używają wcześniejszej wersji.

Pełne informacje o wydaniu: https://github.com/privkeyio/keep/releases/tag/v0.12.2`,
    fr_FR: `Met à jour Keep vers 0.12.2.

- Ne fait plus confiance aux certificats d'une autorité de certification compromise (eMudhra).
- Le bunker NIP-46 n'approuve plus automatiquement les types d'événements qu'un client indique à la connexion, refuse une approbation restée sans réponse et cesse de servir un client dès qu'il est révoqué.
- Les portefeuilles FROST à quatre niveaux de récupération ou plus peuvent désormais être configurés.
- Keep met à niveau le coffre la première fois que 0.12.2 l'ouvre, et les versions antérieures ne peuvent plus l'ouvrir ensuite : cette mise à jour ne peut donc pas être annulée.
- Les membres en 0.10.0 ou ultérieure signent ensemble.

Si vous mettez à jour depuis 0.7.5, cela inclut aussi Keep 0.10.0, qui modifie le protocole de signature FROST : tous les membres d'un groupe de signature doivent mettre à jour en même temps, car 0.10.0 et les versions ultérieures ne peuvent pas signer avec des membres restés sur une version antérieure.

Notes de version complètes : https://github.com/privkeyio/keep/releases/tag/v0.12.2`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
