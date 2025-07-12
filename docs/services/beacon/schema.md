# Beacon

## Interaction

```mermaid
flowchart TB
    subgraph Gateway
        Horizon[Horizon]
        Bridge[Bridge]
    end

	subgraph Report
		Beacon[Beacon]
	end

	Horizon --> Beacon
	Bridge --> Beacon
	
    classDef gateway fill:#6272a4,color:white
	classDef report fill:#8B2920,color:white

    class Horizon,Bridge gateway
	class Beacon report
```

> [!NOTE]
> **Horizon** appelle **Beacon** pour créer des signalements sur la traduction d'un document.
> **Bridge** appelle **Beacon** pour modérer les signalements sur la traduction d'un document.

## Composition

- **Database:** MongoDB
- **Interface:** HTTP