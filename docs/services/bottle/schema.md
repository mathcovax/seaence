# Bottle

---

Service de notification, il permettra d'envoyer des notifications aux utilisateurs.

## Interaction

```mermaid
flowchart TB
    subgraph Gateway
        Horizon[Horizon]
    end

    subgraph User
        Harbor[Harbor]
    end

    subgraph Social
        School[School]
    end

    subgraph Notification
        Bottle[Bottle]
    end

    Horizon --> Bottle
    School --> Bottle
    Harbor --> Bottle
	
    classDef gateway fill:#6272a4,color:white
    classDef auth fill:#ff79c6,color:white
    classDef social fill:#50fa7b,color:black
    classDef notification fill:#bd93f9,color:white

    class Horizon gateway
    class Harbor auth
    class School social
    class Bottle notification
```

> [!NOTE]
> **Horizon** appelle **Bottle** pour la création de notifications.
> **School** appelle **Bottle** pour la création de notification d'avertissement.
> **Harbor** appelle **Bottle** pour la création de notification lié à un utilisateur.

## Composition

- **Database:** MongoDB
- **Interface:** HTTP
- **External Services:** Brevo

## Technologie

- Duplo