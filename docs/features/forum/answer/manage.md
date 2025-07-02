### Global user story

- J'arrive sur la page d'administration des réponses
- Je vois la réponse la plus ancienne qui a le status `unprocessed`
- En cas de conformité de la réponse:
    * Le status de la réponse change en `compliant`
    * Récupère la nouvelle réponse la plus ancienne non traitée sur la page d'administration des réponses
- En cas de non conformité d'une réponse:
    * Ouverture d'un formulaire
    * Je dois pouvoir préciser la raison
    * Je peux cocher une check-box qui entraînera un ban de l'utilisateur
    * je valide
    * l'utilisateur reçoit sa sanction et est averti par une notification
    * le status de la réponse change en `notCompliant`

### Harbor user story

- Je crée un avertissement de type `AnswerUserWarning` avec:
    * L'ID de la réponse concernée
    * l'ID du post en relation avec la réponse
    * La raison de l'avertissement
    * Un flag pour indiquer si l'utilisateur doit être banni
- Si le flag `makeUserBan` est activé:
    * L'utilisateur est banni automatiquement
    * Une notification de ban est envoyée à l'utilisateur
- Sinon:
    * Une notification d'avertissement est envoyée à l'utilisateur

### School user story

- Je peux récupérer la réponse la plus ancienne avec le status `unprocessed`
- Je peux mettre à jour le status d'une réponse vers `compliant` ou `notCompliant`
- Je peux compter le nombre total de réponses non traitées
- Je filtre les réponses récupérer via un post pour ne pas récupérer les réponses statuée `notCompliant`

### Bridge user story

- J'expose une route `POST /answer-moderation-page` qui:
    * Récupère la réponse la plus ancienne non traitée depuis School
    * Récupère les détails du nombre total de réponses non traitées
- J'expose une route `POST /answers/{answerId}/is-compliant` qui:
    * Marque une réponse comme conforme dans School
- J'expose une route `POST /answers/{answerId}/is-not-compliant-and-create-warning` qui:
    * Met à jour le status de la réponse vers `notCompliant` dans School
    * Puis crée un avertissement en appelant Harbor

### Horizon user story

- Si la réponse du post récupérée est `notCompliant` alors je remplace le contenue du message par des étoiles ("*")

### Lighthouse user story
- Créer la page `administration des réponses`


