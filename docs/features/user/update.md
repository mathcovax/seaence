## Feat : changer ses information

### Global user story

* Je suis connecté
* Je suis sur la page profile
* Je vois un formulaire
* Je vois pré rempli:
	- un champ avec mon pseudo
	- un select avec ma langue
	- un champ avec mon email
* je peux modifier que ma langue et mon pseudo
* Je valide
* Mon pseudo et ou ma langue est changé

### Harbor implémentation

Lors de la modification du user, déclancher l'async messsage `updateUser`

### school implémentation

Ce brancher sur l'async messsage `updateUser`. Quand le pseudo est modifier, mettre a jour le nom de l'utilisateur sur ses post et ses réponse de l'utilisateur.

### bottle 
Ce brancher sur l'async messsage `updateUser`. Sychronisé l'utilisateur.