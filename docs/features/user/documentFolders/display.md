## Feat: Lister les dossiers de documents d'un utilisateur

### Global user story

- Je suis connecté
- Je suis sur la page de listing des dossiers de documents
- Sur cette page, je peux lister les dossiers de documents par page
- Un champ text de recherche par nom de dossier est disponible
- J'écire qu'elle que chose
- Je click sur le boutton recherche ou j'appuis sur entrer
- La liste des fichier s'actualise.
- Quand je recherche des dossiers, le total calculer s'acualise en fonction de la nouvel recherche

### Horizon implémentation

**Notes :**

- La recherche et le count de result de la recherche sont dissociés
- Le count de la recherche est un detail de page dynamique
- Le count de dossier de document global est un detail de page non dynamique

### Coral implémentation

La recherche ce tri sur le champ `lastAction` DESC