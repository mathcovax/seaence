# Coral

---

Service de gestion de données utilisateur. Il permettra de stocker les données utilisateur et de les gérer.

## Interaction

```mermaid
flowchart TB
    subgraph Gateway
        Horizon[Horizon]
    end

    subgraph User
		Coral[Coral]
		Harbor[Harbor]
    end

	Horizon --> Coral
	Harbor -.->|Async Message| Coral
	
    classDef gateway fill:#6272a4,color:white
    classDef auth fill:#ff79c6,color:white

    class Horizon gateway
    class Coral auth
```

> [!NOTE]
> **Horizon** appelle **Coral** pour permettre aux utilisateurs d'acceder à leurs données\
> **Coral** est abonnée au flux de delete d'un utilisateur

## Composition

- **Databases:** MongoDB
- **Interfaces:** HTTP

## Technologie

- Duplo