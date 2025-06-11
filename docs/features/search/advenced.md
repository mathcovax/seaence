## Feat : Faire une recherche avencée

### Global user Story
- Je suis sur la page de recherche avancée
- je vois:
	* un bouton pour valider ma recherche
	* un select pour choisir la ma langue de recherche
	* le moteur d'équation avec comme valeur pars défaut un opérateur `ET` avec un comparateur textuel
- J'écrie dans "meta" dans le comparateur textuel
- Je selection l'anglais
- je valide ma recherche
- je vois les resulta avec mie en avant le term de ma recherche

### Comparateur
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

### Opérateur
#### AND
Permet de composé une recherche avec plusieur comparateur et opérateur. les resulta seront coforme a toute les comparaison contribuer.

#### OR
Permet de composé une recherche avec plusieur comparateur et opérateur. les resulta seront coforme a une ou plusieur comparaison contribuer.

#### NOT
Inverse un comparateur ou opérateur. lees resulta seront pas coforme comparaison contribuer.