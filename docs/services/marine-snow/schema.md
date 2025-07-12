# Marine-Snow

## Interaction

```mermaid
flowchart TB

    subgraph Search
        Abys[Abys]
        MarineSnow[MarineSnow]
    end
    
    MarineSnow --> Abys
	
    classDef search fill:#8be9fd,color:black
	
    class Abys,MarineSnow search
```

> [!NOTE]
> **Marine-Snow** appelle **Abys** pour créer enregistrer les documents précédement crawler

## Composition

- **Databases**: Postgres
- **Interfaces:** HTTP
