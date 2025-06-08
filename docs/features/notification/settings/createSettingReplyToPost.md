## Feat: creation un settings pour avoirs les notification des réponses d'un post.

### Global user story

- Je suis sur la page de création de post
- Je créer un post:
	- ça créer automatiquement un setting d'abonnement aux notifications de réponse de ce post

- Je suis sur une page post
- je clique sur une case à coché pour créer mon setting d'abonnement aux notifications de réponse de ce post

### School user story

- Je créer un post
	- ca créer un settings de notification aux réponses de ce post

### Bottle user story

- Je créer un settings de notification pour les réponses d'un post

### School implémentation

Lors de la création d'un post il faut créer un settings de notification aux réponses de ce post

PS:
- L'action de création de settings de notification aux réponses d'un post, ce fait de facon synchrone (route `BottleAPI`)

### Bottle implémentation

Je dois pouvoir créer un settings de notification aux réponses d'un post.

PS:
- doit ce faire via une route pour que `Horizon` et `School` puisse en créer