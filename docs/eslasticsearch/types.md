# Types de données

| Type           | Description  |
|----------------|--------------|
| **text**       | Utilisé puor les chaînes de caractères longues. Permet l'analyse (tokenization, stemming). Idéal pour les recherches textuelles. |
| **keyword**    | Utilisé pour les chaînes exactes (mots-clés, identifiants, codes). Non analysé, idéal pour les tris et agrégations. |
| **integer**    | Nombre entier (32 bits). |
| **long**       | Nombre entier long (64 bits). |
| **short**      | Nombre entier court (16 bits). |
| **byte**       | Nombre entier très court (8 bits). |
| **double**     | Nombre à virglue flottante (64 bits). |
| **float**       | Nombre à virgule flottante (32 bits). |
| **half_float**  | Nombre flottant moins précis (16 bits), optimisé pour la performance. |
| **scaled_float** | Nombre flottant stocké en tant qu’entier avec une mise à l’échelle (ex. pour stocker des montants financiers avec une précision fixe). |
| **boolean**    | Valeur `true` ou `false`. |
| **date**       | Date sous forme de timestamp ou de chaîne (`yyyy-MM-dd'T'HH:mm:ssZ`). |
| **range**      | Représente une plage de valeurs (`integer_range`, `float_range`, `date_range`, etc.). |
| **ip**         | Adresse IP (IPv4 ou IPv6). |
| **geo_point**  | Coordonnées géographiques (`lat`, `lon`). |
| **geo_shape**  | Représente des formes géographiques (polygones, lignes, etc.). |
| **nested**     | Stocke des objets imbriqués en maintenant leur structure (évite le cross-object matching). |
| **object**     | Stocke des objets JSON, mais sans préserver leur relation interne entre les champs (non `nested`). |
| **binary**     | Stocke des données binaires encodées en `base64`. |
| **stop**       | Utilisé pour les champs de type `text` pour ignorer certains mots (stop words) lors de l'analyse. |
| **synonym**    | Utilisé pour les champs de type `text` pour inclure des synonymes lors de l'analyse. |
| **custom**     | Permet de définir des types personnalisés pour des besoins spécifiques. |

## Remarques

- `text` est utilis pour l’analyse textuelle tandis que `keyword` permet les recherches exactes.
- `nested` est utile pour des tableaux d’objets afin de conserver l’intégrité des données.
- `geo_point` et `geo_shape` sont essentiels pour la gestion des données géospatiales.
