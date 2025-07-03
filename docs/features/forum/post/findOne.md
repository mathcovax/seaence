# Feat: Récupération d'un post

## Global user story

- Je suis connecté
- J'accède à un post via l'ID du document auquel il est lié
- Le post existe
  - Je récupère le post complet avec toutes ses réponses associées
  - Les réponses avec le statut `compliant` ou `unprocessed` s'affichent normalement
  - Les réponses avec le statut `notCompliant` ont leur contenu obfusqué par des étoiles
- Si le post n'existe pas
  - Je suis redirigé vers la dernière page où je me situais

## School implémentation

Je dois pouvoir récupérer un post via l'ID d'un document.

## Horizon implémentation

J'expose le endpoint pour le rendre accessible à Spotter.
