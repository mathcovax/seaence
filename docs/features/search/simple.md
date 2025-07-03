## Feat : Faire une recherche simple

### Global User Story
- Je suis sur la page de recherche simple
- Je vois :
  * un input texte dans lequel je peux faire ma recherche  
  * un select dans lequel je peux choisir la langue dans laquelle je fais ma recherche  
  * un bouton pour valider ma recherche  
- Je tape dans l'input "meta"  
- Je sélectionne l'anglais  
- Je valide ma recherche  
- Je vois les résultats avec mis en avant le terme de ma recherche  

### Rules
- Les champs sur lesquels ma recherche s’applique sont :
  * le titre  
  * l’abstract  
  * les mots-clés  
  * les auteurs  
- La recherche ne doit pas être sensible à la casse  
- Les groupes de mots doivent avoir plus d’impact dans les résultats de recherche  
- Les termes de la recherche doivent être mis en avant
- Je doit pouvoir distinger les resultas de recherche lier a un document qui on déjà étais enregister dans un dossier par l'utilisateur

#### strict :
- Il doit être possible de faire des termes stricts avec l’utilisation de doubles quotes : `"monTerm"`  
- Les termes stricts exigent que les mots soient recherchés sous la forme donnée sans être sensibles à la casse ou aux accents :  
  * Recherche : "role of diagnostic"  
  * Match avec : ...role of diagnostic..., ...role OF diagnostic..., ...Role Of Diâgnostic...  
  * Ne match pas avec : role diagnostic, rol of diagnostic  
- Les termes stricts doivent avoir plus d’impact dans les résultats de recherche  
- Pour chercher sur le champ auteur, il faut passer par un terme strict  
- Les termes stricts doivent être mis en avant avec une couleur différente  

#### troncature :
- Il doit être possible de faire des termes troncaturés avec un astérisque : `mon*`  
- Les termes troncaturés exigent que les mots soient recherchés sous la forme donnée sans être sensibles à la casse ou aux accents :  
  * Recherche : musc*  
  * Match avec : ...musc..., ...musculation..., ...muscle...  
  * Ne match pas avec : "mus", "mucs"  
- Les termes ont le même impact que par défaut  
- Les termes de la recherche doivent être mis en avant  
