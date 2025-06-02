## Feat: Inscription utilisateur

### Globals user story

- Je suis sur la page home
- Je click sur le boutton ce connecter/s'inscrire
- Je vois une modal avec un boutton pourt ce connecter avec google
- Je click sur le boutont de connexion google
- J'utilise le SSO
- Je reviens dans la modal
- Je vois un formulaire ou je doit indiquer mon pseudo et valider les condition d'utilisation
- Je valide le fomulaire
- Le dialog ce ferme et je suis connecter.

### Harbor user story

- Je reçois une nouvel email avec un pseudo
- Je créer un nouvel utilisateur

### Bottle user story
- je recois un utilisateur qui vient d'étre créer,
- je le créée de mon coté 

### Harbor implémentation

Je créer un user.

PS:
- envoi d'un async message `createUser` quand l'utilisateur n'existe pas

### Bottle implémentation

Je créer un user.

PS:
- La création d'un user ce fait via l'écoute de l'async message `createUser`
