## Feat: Créer un dossier de document

### Global user story

1. 
	- Je suis connecté
	- Je suis sur la page qui liste mes dossiers de documents
	- Je clique sur le bouton "+" pour créer un dossier
	- Une pop-over apparait avec un champ name obligatoire à compléter
	- Une fois compléter, je valide
	- Un dossier vide est créer dans la liste
2. 
	- Je suis connecté
	- Je suis sur page d'un document
	- Je clique sur le bouton
	- Une pop-over apparait avec une liste de dossiers de documents et un bouton pour créer un dossier
	- Je clique sur le bouton pour créer un dossier
	- Un dialog apparait avec un champ name obligatoire à compléter
	- Une fois compléter, je valide
	- Un dossier qui contient le document de la page actuelle est créer

### Coral implémentation

**Notes :**

- Il n'est pas possible pour un utilisateur de créer deux dossiers avec le même nom
- Le champs `lastAction` est automatiquement creer sur l'entté avec la date courante comme le  champ `createdAt`