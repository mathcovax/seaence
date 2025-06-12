## Feat : Faire une recherche simple

### Global user Story
- Je suis sur la page de recherche simple
- Je vois :
	* un input text dans le qu'elle je peux faire ma recherche
	* un select dans le qu'elle je peux choisire la lange dans la qu'elle je fait ma recherche
	* un boutton pour valider mas recherche
- Je tape dans l'input "meta"
- Je selection l'anglais
- je valide ma recherche
- je vois les resulta avec mie en avant le term de ma recherche

### Rules
- Les champ sur les qu'elle ma recherche s'applique sont :
	* le titre 
	* l'abstract
	* les mots clef
	* les autheur
- La recherche ne doit pas étre senssible a la CASE
- Les groupe de mot doivent avoir plus d'impacte dans les resultas de recherche
- les term de la recheche doivent étre mit en avant

strict:
- Il doit étre possible de faire des terme strict avec l'utilisation de double cote : `"monTerm"`
- les terme strict exige que les mot sois recherche sous la forme donner sans étre sensible a la casse ou au accens :  
	* Recherche : "role of diagnostic"
	* match avec : ...role of diagnostic..., ...role OF diagnostic..., ...Role Of Diâgnostic...
	* ne match pas avec : role diagnostic, rol of diagnostic
- les terme strict doivent avoir plus d'impacte dans les resultas de recherche
- pour chercher sur le champ autheur il faut passé par un terme strict
- les term strict de recherche doivent étre mit en avant avec une couleur diférente

troncature:
- Il doit étre possible de faire des terme troncaturé avec un astérix : `mon*`
- les terme strict exige que les mot sois recherche sous la forme donner sans étre sensible a la casse ou au accens :  
	* Recherche : musc*
	* match avec : ...musc..., ...musculation..., ...muscle...
	* ne match pas avec : "mus", "mucs"
- les term on la même impact que pars défaut 
- les term de la recheche doivent étre mit en avant

