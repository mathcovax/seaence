## Feat: signaler la mauvaise traduction d'un document cuit

### Global user story

- je suis sur un page document
- je vois une erreur de tradution : `haster` au lieux de `ischio jambier`
- je click sur un bouter de signalment de probléme de tradution.
- je vois un dialog qui s'ouvre avec un formulaire 
- je peu indiquer le probléme de traduction
- je valide le formulaire
- le dialog ce ferme

### beacon user story

- je créer un signalment de probléme de traduction d'un document cuit lier un un utilisateur et a un document

### beacon implémentation

Creer ou mettre a joure un signalment de probléme de traduction d'un document cuit

PS:
- doit ce faire via un upsert lier au `backedDocumentId` et au `userId`.
