## Feat : signaler une mauvaise traduction d’un document CUIT

### User story globale

* Je suis sur une page de document.
* Je repère une erreur de traduction : `haster` au lieu de `ischio-jambier`.
* Je clique sur un bouton de signalement de problème de traduction.
* Une boîte de dialogue s’ouvre avec un formulaire.
* Je peux décrire le problème de traduction.
* Je valide le formulaire.
* La boîte de dialogue se ferme.

### User story côté Beacon

* Je crée un signalement de problème de traduction pour un document CUIT, lié à un utilisateur et à un document.

### Implémentation côté Beacon

Créer ou mettre à jour un signalement de problème de traduction pour un document CUIT.

**Note :**

* L’opération doit être réalisée via un *upsert*, lié au `backedDocumentId` et au `userId`.

---

Souhaite-tu une version plus formelle ou plus technique (par exemple pour un changelog ou une PR) ?
