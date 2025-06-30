## Feat : gestion des signalements de mauvaise traduction de document CUIT (Back Office)

### User story globale

* Je suis sur la page listant les documents CUIT signalés :
  * La liste doit être paginée.
  * Seuls les documents CUIT ayant au moins un signalement doivent apparaître.
  * Les documents doivent être triés par nombre de signalements (ordre décroissant).
* Je clique sur un des documents CUIT de la liste.
* Je suis redirigé vers la page de gestion des signalements pour ce document CUIT.
* Sur cette page, je vois :
  1. La liste des signalements :
     * Elle doit être paginée.
     * Chaque tuile contient les détails du signalement.
  2. Le document CUIT complet.
  3. Un bouton permettant de proposer une nouvelle traduction.
  4. un select pour choisir le type de cuisson qu'on va utiliser.
* Je sélectionne un type de cuisson.
* Je clique sur le bouton pour proposer une nouvelle traduction.
* Une boîte de dialogue s'ouvre avec un formulaire de proposition.
* Je peux soit valider la nouvelle traduction, soit fermer le dialogue :
  * Si je valide, tous les signalements liés au document CUIT sont supprimés.

### User stories côté **Beacon**

* Récupérer une liste d'agrégats de signalements, regroupés par document CUIT.
* Récupérer la liste des signalements liés à un document CUIT.
* Supprimer tous les signalements liés à un document CUIT.

### User stories côté **Abys**

* Récupérer une liste de titres de documents CUIT à partir d'une liste d'identifiants.
* Récupérer le contenu complet d'un document CUIT.
* Tester une nouvelle traduction pour un document CUIT.
* Forcer la retraduction d'un document.

### Implémentation côté **Beacon**

* Les signalements sont regroupés par l'identifiant du document CUIT.
* L'agrégat peut être représenté par une entité spécifique (ex. : `TranslationReportAggregate`).