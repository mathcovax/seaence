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
- Je saissie le nom que j'attribu au document dans mon dossier
- Je choisi le ou les dossier dans le qu'elle sera ranger le document
- Je valide
- Je vois la liste des dossiers dans le qu'elle le document est s'actualisé.

### Coral implémentation

**Notes :**

- Quand un utilsateur ajoute un document dans le dossier, réactualiser le champ `lastAction` du dossier dans le quel on ajoute le document