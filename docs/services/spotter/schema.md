# Spotter

## Interaction

```mermaid
flowchart TB
    subgraph Client
        Spotter[Spotter]
    end

    subgraph Gateway
        Horizon[Horizon]
    end

    Spotter --> Horizon
	
    classDef frontend fill:#42b883,color:white
    classDef gateway fill:#6272a4,color:white

    class Spotter frontend
    class Horizon gateway
```

> [!NOTE]
> **Horizon** est la porte d'entrée sécurisée de **Spotter**

## Composition

- **Interfaces:** HTTP