# Bridge

---

API Gateway pour le BackOffice. Il ne peut etre requeter que par le service Lighthouse.

## Interaction

```mermaid
flowchart TB
    subgraph Gateway
        Bridge[Bridge]
    end

    subgraph Search
        Abys[Abys]
    end

    subgraph Social
        School[School]
    end

    subgraph BackOffice
        Lighthouse[Lighthouse]
    end

	subgraph Report
		Beacon[Beacon]
	end

    Lighthouse --> Bridge
    Bridge --> Abys
    Bridge --> School
	Bridge --> Beacon
	
    %% Styles
    classDef gateway fill:#6272a4,color:white
    classDef auth fill:#ff79c6,color:white
    classDef search fill:#8be9fd,color:black
    classDef social fill:#50fa7b,color:black
    classDef bo fill:#ffb86c,color:black
	classDef report fill:#8B2920,color:white

    %% Application des styles
    class Bridge gateway
    class Harbor auth
    class Sea,Abys search
    class School social
    class Lighthouse bo
	class Beacon report
```

> [!NOTE]
> **Bridge** appelle **Beacon** pour modérer la traduction des documents.
> **Bridge** appelle **School** pour modérer le contenus du forum.
> **Bridge** appelle **Abys** pour re-cuire un document.

## Composition

- **Interfaces:** HTTP

## Technologie

- Duplo