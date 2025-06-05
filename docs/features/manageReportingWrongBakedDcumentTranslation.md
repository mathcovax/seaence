## Feat: gestion des signalement de mauvaise traduction de document cuit (BO)

### Global user story
- je suis sur la page qui list les document cuit signaler :
	* la list doit étre paginé
	* apparaise uniquement les document cuit avec des signalment
	* doit étre trier en fonction du nombre de signalment
- je click sur un des document cuit de la liste
- je suis rediriger sur la page de géstion des signalement d'un document cuit.
- je vois:
	1. la liste des signalment:
		* la list doit étre paginé
		* chaque tuile de la liste contien le detaile du signalment
	2. le document cuit complet
	3. un boutton pour proposé une nouvel traduction
- je click sur le bouton pour proposé une nouvel traduction
- je vois cote a cote dans un dialog la nouvel proposition de traduction et le document actuel.
- je peu valider la nouvel traduction ou fermer le dialog
	* si je valide, cela supprime tout les signalment lier au document cuit

### Beacon user story

- récupérer une liste d'aggregat de signalement regrouper pars document cuit

- je récupére la liste de signalment lier a un document cuit

- je supprimme la liste de signalment lier a un document cuit

### Abys user story

- je récupére une lise de titre de document cuit a partire d'une liste d'identifiant de document cuit

- je récupére un document cuit 

- je test une nouvel tradution d'un document cuit

- je force la re traduction d'un document

### Beacon implémentation

La liste d'aggregat de signalement ce regroupe par l'indentifiant de document cuit.

PS:
- l'agregat peu étre représenter par une entité spécial

### Abys implémentation