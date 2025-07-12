# School

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

    Horizon --> School
    Bridge --> School
    School --> Bottle
	School --> Harbor
	Harbor -.->|Async Message| School
	School -.->|Async Message| Bottle
	
    %% Styles
    classDef gateway fill:#6272a4,color:white
    classDef auth fill:#ff79c6,color:white
    classDef social fill:#50fa7b,color:black
    classDef notification fill:#bd93f9,color:white

    %% Application des styles
    class Horizon,Bridge gateway
    class Harbor auth
    class School social
    class Bottle notification
```

> [!NOTE]
> **Horizon** appelle **School** pour accéder aux contenus des forums
> **School** appelle **Bottle** pour envoyer des notifications
> **School** appelle **Harbor** pour mettre des avertissements aux utilisateurs pour leurs contenus
> **Bridge** appelle **School** pour administrer le contenu
> **School** est abonnée au flux de mise à jour d'un utilisateur
> **School** Émet un flux de création de contenu

## Composition

- **Database:** MongoDB
- **Interface:** HTTP