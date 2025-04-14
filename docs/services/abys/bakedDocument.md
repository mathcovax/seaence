# 📄 Format de document Baked – Documentation

- [Issue 23](https://github.com/mathcovax/seaence/issues/23)

## ✅ Objectifs atteints

- Mise en place d’un format de données **baked** uniformisé
- Schéma TypeScript de la sortie API de **Rosetta**
- Usecase de transformation `raw -> baked`
- Modèle MongoDB pour les documents baked
- Intégration d’un provider **Rosetta** dans **Abys**

```mermaid
sequenceDiagram
    participant Abys
    participant Rosetta
    participant MongoDB

    Abys->>Abys: Convertit le document raw en baked
    Abys->>MongoDB: Sauvegarde le document baked
    Abys->>Rosetta: Demande de traduction avec document baked
    Rosetta-->>Rosetta: Traitement de la traduction
    Rosetta-->>Abys: Retour des versions baked traduites
    Abys->>MongoDB: Sauvegarde des traductions
    Rosetta-->>Abys: retour des versions baked traduite
    Abys->>Abys: Sauvegarde les traductions
```

## 🚧 Pour tester

[commands](./commands.md) : `npm run docker:abys:document:cookRawDocument -- -q 10 -l fr-FR`
