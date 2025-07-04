# Feat: Création d'une réponse sur un post

## Global user story

- Je suis connecté
- Je suis sur un post
- Mon compte n'est pas banni
  - Je vois un formulaire pour créer une réponse
  - Je rédige ma réponse
  - Je valide
  - Ma réponse est créée et publiée sur le post
  - Le nombre de réponses du post est mis à jour
- Si mon compte est banni
  - Je ne peux pas créer de réponse
  - Une notification popup m'informe que je suis banni

- Un utilisateur banni ne peut créer aucune réponse, tous posts confondus
- Une réponse est automatiquement créée avec le statut `unprocessed`
- Le nombre de réponse lié à un post se met à jour à chaque fois que je créer une réponse sur un post.

## School implémentation

Pouvoir créer une réponse sur un post.
Mettre à jour le nombre de réponse sur un post.

## Horizon implémentation

Vérifie si l'utilisateur est ban ou non pour effectuer l'action.
