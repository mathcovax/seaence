## Feat: Envois de notifications lors d'une réponse a un post.

### Global user story

- je suis sur une page poste
- je réponde au poste
- tout les utilisateur qui ont autotriés l'envois de notification sur ce poste reçoive une notification.

### School user story

- un utilisateur créer une réponse
- je créer une notification de réponse au poste lier

### Bottle user story

- une notification de réponse de poste demande a être créer.
- je créer une notification a toute les personne qui possède le setting lier a ce post

### School implémentation

Quand une réponse a un poste est créer, le service envoie un async message `createReplyToPost`

PS :
- Doit ce faire uniquement lors de la création du poste dans la méthode save. 

### Bottle implémentation

Quand un je recois un async message `createReplyToPost`. Je créer les notification à tout les users qui possédent le setting par rapport au post en question. 

PS: 
- Prendre en compte que le nombre d'utilisateurs ayant un setting, peut être infini.
- L'existence du setting lier au post determine si la personne reçoi une notification

