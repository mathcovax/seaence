## Feat: Inscription utilisateur

### Globals user story

- Je suis sur la page home
- Je click sur le boutton ce connecter/s'inscrire
- Je vois une modal avec un boutton pourt ce connecter avec google
- Je click sur le boutont de connexion google
- J'utilise le SSO
- Je reviens dans la modal
- Je vois un formulaire avec:
	* un champ avec mon pseudo
	* langue que je veut utilisais
	* une checkbox pour valider les condition d'utilisation
- Je remplie tout les champ.
- Je valide le fomulaire
- Le dialog ce ferme et je suis connecter
- Je recois notification de bienvenue

### Harbor implémentation

Je créer un user.

PS:
- envoi d'un async message `createUser`

### Bottle implémentation

Je créer un user de manière desynchronisé

PS:
- La création d'un user ce fait via l'écoute de l'async message `createUser`
- Je créer la notification de bienvenue après avoir la création du user
