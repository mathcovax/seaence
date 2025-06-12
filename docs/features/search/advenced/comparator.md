## Feat : utilisais un comparateur

### global User story
- je suis sur le page de recherche avancé
- je vois un bouton pour ajouter un comparateur
- je clique dessus
- un dialog s'ouvre avec un onglet `comparator`
- je vois une liste avec tout les comparateur disponible
- je click sur celui que je veux
- le dialog ce ferme
- je vois mon comparateur dans l'équation

### Details
Les comparateur doivent tous avoir un moyen de gér le niveau de boost de leur comparaison recherche.

#### text
champ concerné :
- titre
- abstract
- mot clef
- tout les champ en même temp

régle:
- le text comparateur permet de faire une recherche full text fléxible. 
- l'ordre des terme ne compte pas
- pas senssible a la case et au acens

#### year
champ concerné :
- date de publication journal
- date de publication web
- tout les champ date

régle:
- le year comparateur pemet d'avoir de résulta qui match suivant une annés
- le champ `tout les champ date` compare en priorité le champ `date de publication journal` et si il n'éxiste pas, il compare le champ `date de publication web`;

#### strict text
champ concerné :
- titre
- abstract
- mot clef
- tout les champ en même temp

régle:
- recherche un terme exact
- l'ordre des terme compte
- pas senssible a la case et au acens
- les correspondente doivent resortir d'une autre coleur que celle du text comparator

#### author
champ concerné :
- autheur

régle:
- soumie au même régle que le comparator strict text

#### articleType
champ concerné :
- types d'article

régle:
- contien le type d'article

#### provider
champ concerné :
- platforme

régle:
- contien la platforme

#### yearInterval
champ concerné :
- date de publication journal
- date de publication web
- tout les champ date

régle:
- compare entre 2 annés en inclusion
- le champ `tout les champ date` compare en priorité le champ `date de publication journal` et si il n'éxiste pas, il compare le champ `date de publication web`;
