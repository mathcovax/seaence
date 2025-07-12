# Harbor

## Interaction

```mermaid
flowchart TB
    subgraph Gateway
        Horizon[Horizon]
        Bridge[Bridge]
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

    Horizon --> Harbor
    Bridge --> Harbor
    Harbor --> Bottle
	Harbor -.->|Async Message| School
	Harbor -.->|Async Message| Bottle
	
    classDef gateway fill:#6272a4,color:white
    classDef auth fill:#ff79c6,color:white
    classDef social fill:#50fa7b,color:black
    classDef notification fill:#bd93f9,color:white

    class Horizon,Bridge gateway
    class Harbor auth
    class School social
    class Bottle notification
```

> [!NOTE]
> **Horizon** appelle **Harbor** pour authentifier les utilisateurs
> **Bridge** appelle **Harbor** pour admistrer les utilisateurs
> **Harbor** appelle **Bottle** pour envoyer des notifications
> **Harbor** créer un flux de création d'utilsateur 
> **Harbor** créer un flux de modification d'utilisateur

## Composition

- **Databases**: Postgres
- **Interfaces:** HTTP
- **External Services:** Firebase