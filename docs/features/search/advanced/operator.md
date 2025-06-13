## Feat : Utiliser un opérateur

### Global User Story
- Je suis sur la page de recherche avancée  
- Je vois un bouton pour ajouter un opérateur  
- Je clique dessus  
- Un dialog s'ouvre avec un onglet `operator`  
- Je vois une liste avec tous les opérateurs disponibles  
- Je clique sur celui que je veux  
- Le dialog se ferme  
- Je vois mon opérateur dans l'équation  

### Détails

#### AND  
Permet de composer une recherche avec plusieurs comparateurs et opérateurs. Les résultats seront conformes à toutes les comparaisons contribuant.

Règles :  
- min : 1  
- max : 10  
- Doit avoir un bouton pour ouvrir le dialog et sélectionner un opérateur ou un comparateur à ajouter dans l'opérateur  

#### OR  
Permet de composer une recherche avec plusieurs comparateurs et opérateurs. Les résultats seront conformes à une ou plusieurs comparaisons contribuant.

Règles :  
- min : 1  
- max : 10  
- Doit avoir un bouton pour ouvrir le dialog et sélectionner un opérateur ou un comparateur à ajouter dans l'opérateur  

#### NOT  
Inverse un comparateur ou un opérateur. Les résultats ne seront pas conformes à la comparaison contribuant.

Règles :  
- min : 1  
- max : 1  
- Doit avoir un bouton pour ouvrir le dialog et sélectionner un opérateur ou un comparateur à ajouter dans l'opérateur
