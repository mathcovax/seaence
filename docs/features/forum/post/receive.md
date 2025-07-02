## Feat: Récupération d'un post

### User story

En tant qu'utilisateur connecté sur l'application Spotter,  
Je veux pouvoir récupérer et consulter un post existant avec ses réponses,  
Afin de lire le contenu et participer aux discussions.

### Critères d'acceptation

- **Étant donné** que je suis connecté sur Spotter
- **Et** que j'accède à un post via l'ID du document auquel il est lié
- **Quand** le post existe
- **Alors** je récupère le post complet avec toutes ses réponses associées
- **Et** les réponses avec le statut `compliant` ou `unprocessed` s'affichent normalement
- **Et** les réponses avec le statut `notCompliant` ont leur contenu obfusqué par des étoiles

### Contraintes

- **Étant donné** que j'accède à un post via son ID
- **Et** que le post n'existe pas
- **Quand** je tente de le consulter
- **Alors** je suis redirigé vers la dernière page où je me situais

### Règles métier

- Les réponses `notCompliant` ont leur contenu automatiquement remplacé par des étoiles
- Les réponses `compliant` et `unprocessed` s'affichent avec leur contenu original
- En cas de post inexistant, redirection automatique vers la page