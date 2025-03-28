# Mini Documentation : Elasticsearch

## 1. Requêter Elasticsearch avec l'API REST

Elasticsearch expose une API REST accessible via HTTP. Les requêtes se font en JSON.

Exemple d'une requête simple pour tester la connexion :

```sh
GET localhost:9200/
```

## 2. Effectuer une recherche simple

Pour chercher tous les documents dans un index :

```sh
GET my_index/_search
```

Pour chercher un document par ID :

```sh
GET my_index/_doc/1
```

## 3. Requêtes de recherche avancées

### 3.1 Rechercher un terme exact (match)

```json
GET my_index/_search
{
  "query": {
    "match": {
      "title": "cancer"
    }
  }
}
```

### 3.2 Rechercher plusieurs termes (bool query)

```json
GET my_index/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "title": "cancer" } },
        { "match": { "abstract": "treatment" } }
      ]
    }
  }
}
```

### 3.3 Recherche en texte libre (query_string)

```json
GET my_index/_search
{
  "query": {
    "query_string": {
      "query": "cancer OR tumor",
      "fields": ["title", "abstract"]
    }
  }
}
```

## 4. Filtrer les résultats

Utiliser `filter` pour des filtres exacts et performants :

```json
GET my_index/_search
{
  "query": {
    "bool": {
      "filter": [
        { "term": { "journal.title.keyword": "Nature" } },
        { "range": { "publication_date": { "gte": "2020-01-01" } } }
      ]
    }
  }
}
```

## 5. Trier les résultats

```json
GET my_index/_search
{
  "query": {
    "match": { "title": "cancer" }
  },
  "sort": [
    { "publication_date": "desc" }
  ]
}
```

## 6. Pagination

```json
GET my_index/_search
{
  "from": 10,
  "size": 10,
  "query": {
    "match_all": {}
  }
}
```

## 7. Agrégations (Statistiques & Groupements)

### 7.1 Nombre total de documents par journal

```json
GET my_index/_search
{
  "size": 0,
  "aggs": {
    "journals": {
      "terms": {
        "field": "journal.title.keyword"
      }
    }
  }
}
```

### 7.2 Moyenne des années de publication

```json
GET my_index/_search
{
  "size": 0,
  "aggs": {
    "avg_year": {
      "avg": {
        "field": "pub_date_parts.year"
      }
    }
  }
}
```

## 8. Indexation d'un document

Ajouter un document :

```json
PUT my_index/_doc/1
{
  "title": "Cancer Treatment Advances",
  "abstract": "New therapies are emerging...",
  "publication_date": "2023-05-10"
}
```

Mettre à jour un document :

```json
POST my_index/_update/1
{
  "doc": {
    "abstract": "Updated abstract content."
  }
}
```

Supprimer un document :

```sh
DELETE my_index/_doc/1
```

## 9. Suppression d'un index

```sh
DELETE my_index
```

## 10. Obtenir la liste des index

```sh
GET _cat/indices?v
```
