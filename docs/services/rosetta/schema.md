# Rosetta

## Interaction

```mermaid
flowchart TB

    subgraph Search
        Abys[Abys]
        Rosetta[Rosetta]
    end

    Abys --> Rosetta

    classDef search fill:#8be9fd,color:black

    class Abys,Rosetta search
```

> [!NOTE]
> **Abys** appelle **Rosetta** pour traduire ces documents

## Composition

- **Interfaces:** HTTP
- **Inrernal Service:** Libretranslate
- **External Service:** Google translate