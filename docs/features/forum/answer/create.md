## Feat: Création d'une réponse sur un post

### User story

En tant qu'utilisateur connecté sur l'application Spotter,  
Je veux pouvoir créer une réponse à un post existant,  
Afin de participer aux discussions du forum.

### Critères d'acceptation

- **Étant donné** que je suis connecté sur Spotter
- **Et** que je consulte un post
- **Et** que mon compte n'est pas banni
- **Quand** je rédige et soumets une réponse
- **Alors** ma réponse est créée et publiée sur le post
- **Enfin** le nombre de réponse au post est modifier pour ajouter la réponse créee.

### Contraintes

- **Étant donné** que mon compte utilisateur est banni
- **Quand** je tente de créer une réponse sur n'importe quel post
- **Alors** l'action est bloquée et je ne peux pas publier de réponse et une notification popup s'affiche me disant que je suis banni.

### Règles métier

- Un utilisateur banni ne peut créer aucune réponse, tous posts confondus
- Une réponse est automatiquement créée avec le statut `unprocessed`
- Le nombre de réponse lié à un post se met à jour à chaque fois que je créer une réponse sur un post.
