# Sea

---

Le service ElasticSearch permettra d'indexer les documents avec un certains poids. Il permettra de faire des recherches avancées et de trouver des documents similaires.

## Interaction

```mermaid
flowchart TB
    subgraph Gateway
        Horizon[Horizon]
    end

    subgraph User
        Harbor[Harbor]
		Coral[Coral]
    end

    subgraph Search
        Sea[Sea]
        Abys[Abys]
    end

    Horizon --> Sea
    Abys --> Sea
	
    classDef gateway fill:#6272a4,color:white
    classDef search fill:#8be9fd,color:black

    class Horizon gateway
    class Sea,Abys search
```

> [!NOTE]
> **Abys** appelle **Sea** pour indexer des documents
> **Horizon** appelle **Sea** pour chercher des documents

## Composition

- **Databases:** EslacticSearch
- **Interfaces:** HTTP

## Technologie

- Duplo