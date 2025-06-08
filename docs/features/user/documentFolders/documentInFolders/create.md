## Feat: Ajouter un document dans un dossiser

### Global user story

- Je suis connecté
- Je suis sur la page d'un document
- Je clique sur le bouton pour ajouter un document dans un dossier
- Un Dialog apparait et je vois dedans:
	- Un champ pour le nom du document
	- Un champ de recherche de dossier
	- Une liste paginer de dossier
	- un button pour créer un dossier
- Je peux:
	- Rechercher les dossier par leur nom
	- Selectionner le dossier dans le quel je veux ajouter le document
	- [Créer un dossier à la volé](../create.md)
- Une fois que j'ai choisie le dossier dans le quel je veux ajouter le document

- Un dialog apparait avec un champ name à completer
- Je complete le champ et valide l'ajout
- Le document a été ajouté dans le dossier

### Coral implémentation

**Notes :**

- Quand un utilsateur ajoute un document dans le dossier, réactualiser le champ `lastAction` du dossier dans le quel on ajoute le document