# Diagramme de séquence Spotter

Ce diagramme de séquence schématise la communication entre les différents micro-services nécessaire à l'authentification d'un utilisateur afin d'en comprendre son fonctionnement.

```mermaid
sequenceDiagram
    participant Spotter
    participant Horizon
    participant Harbor

    Spotter->>Spotter: popup de login firebase auth
    Spotter->>Horizon: Requête d'authentification
    Horizon->>Horizon: Récupération du token firebase dans le body
    Horizon->>Harbor: Envois du token firebase
    Harbor->>Harbor: créer ou récupère un user.
    Harbor->>Harbor: génére un JWT avec l'id du user.
    Harbor-->>Horizon: Envois token JWT
    Horizon-->>Spotter: Envois token JWT.
    Spotter->>Spotter: Stockage du token le local storage.
```
