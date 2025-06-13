## Feat : utiliser un comparateur

### Global User Story
- Je suis sur la page de recherche avancée  
- Je vois un bouton pour ajouter un comparateur  
- Je clique dessus  
- Un dialog s'ouvre avec un onglet `comparator`  
- Je vois une liste avec tous les comparateurs disponibles  
- Je clique sur celui que je veux  
- Le dialog se ferme  
- Je vois mon comparateur dans l'équation  

### Détails
Les comparateurs doivent tous avoir un moyen de gérer le niveau de boost de leur comparaison de recherche.

#### Text  
Champ concerné :  
- Titre  
- Abstract  
- Mot-clé  
- Tous les champs en même temps  

Règles :  
- Le text comparator permet de faire une recherche full text flexible.  
- L'ordre des termes ne compte pas  
- Pas sensible à la casse et aux accents  
- Soumis aussi aux règles de troncature de la [recherche simple](../simple.md)  

#### Year  
Champ concerné :  
- Date de publication journal  
- Date de publication web  
- Tous les champs date  

Règles :  
- Le year comparator permet d'avoir des résultats qui matchent suivant une année  
- Le champ `tous les champs date` compare en priorité le champ `date de publication journal`, et s’il n’existe pas, il compare le champ `date de publication web`  

#### Strict Text  
Champ concerné :  
- Titre  
- Abstract  
- Mot-clé  
- Tous les champs en même temps  

Règles :  
- Recherche un terme exact  
- L'ordre des termes compte  
- Pas sensible à la casse et aux accents  
- Les correspondances doivent ressortir d'une autre couleur que celle du text comparator  

#### Author  
Champ concerné :  
- Auteur  

Règles :  
- Soumis aux mêmes règles que le comparator strict text  

#### ArticleType  
Champ concerné :  
- Types d'article  

Règles :  
- Contient le type d'article  

#### Provider  
Champ concerné :  
- Plateforme  

Règles :  
- Contient la plateforme  

#### YearInterval  
Champ concerné :  
- Date de publication journal  
- Date de publication web  
- Tous les champs date  

Règles :  
- Compare entre 2 années en inclusion  
- Le champ `tous les champs date` compare en priorité le champ `date de publication journal`, et s’il n’existe pas, il compare le champ `date de publication web`
