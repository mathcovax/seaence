# Documentation API PubMed

## Introduction

L'API PubMed est un service de recherche d'articles scientifiques et médicaux. Il permet d'accéder à une vaste base de données d'articles de revues biomédicales, de livres et d'autres ressources. L'API PubMed offre des fonctionnalités avancées pour la recherche, la récupération et l'analyse des données.

Il est découpé en plusieurs sections :

- ESearch: pour rechercher des termes dans les bases de données
- EFetch: pour récupérer des enregistrements complets
- ESummary: pour obtenir des résumés d'enregistrements
- ELink: pour trouver des liens entre les enregistrements
- EPost: pour télécharger des listes d'identifiants
- EInfo: pour obtenir des informations sur les bases de données

Pour notre travail sur le projet Seance, nous auront principalement besoin de l'API ESearch et EFetch.

## ESearch

L'API ESearch permet de rechercher des articles dans la base de données PubMed en utilisant des termes de recherche spécifiques. Elle renvoie une liste d'identifiants d'articles correspondant à la recherche.

### Exemple basique

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=diabetes&retmode=json
```

Result:

```json
{
  "header": {
    "type": "esearch",
    "version": "0.3"
  },
  "esearchresult": {
    "count": "1039088",
    "retmax": "20",
    "retstart": "0",
    "idlist": [
      "40113523",
      "40113502",
      ...
    ],
    "translationset": [
      {
        "from": "diabetes",
        "to": "\"diabete\"[All Fields] OR \"diabetes mellitus\"[MeSH Terms] OR (\"diabetes\"[All Fields] AND \"mellitus\"[All Fields]) OR \"diabetes mellitus\"[All Fields] OR \"diabetes\"[All Fields] OR \"diabetes insipidus\"[MeSH Terms] OR (\"diabetes\"[All Fields] AND \"insipidus\"[All Fields]) OR \"diabetes insipidus\"[All Fields] OR \"diabetic\"[All Fields] OR \"diabetics\"[All Fields] OR \"diabets\"[All Fields]"
      }
    ],
    "querytranslation": "\"diabete\"[All Fields] OR \"diabetes mellitus\"[MeSH Terms] OR (\"diabetes\"[All Fields] AND \"mellitus\"[All Fields]) OR \"diabetes mellitus\"[All Fields] OR \"diabetes\"[All Fields] OR \"diabetes insipidus\"[MeSH Terms] OR (\"diabetes\"[All Fields] AND \"insipidus\"[All Fields]) OR \"diabetes insipidus\"[All Fields] OR \"diabetic\"[All Fields] OR \"diabetics\"[All Fields] OR \"diabets\"[All Fields]"
  }
}
```

### Paramètres principaux

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| `db` | Base de données à interroger (obligatoire) | `db=pubmed` |
| `term` | Termes de recherche (obligatoire) | `term=cancer` |
| `retmode` | Format de retour | `retmode=json` ou `retmode=xml` |
| `retmax` | Nombre maximum de résultats à retourner | `retmax=100` (défaut: 20) |
| `retstart` | Index de départ pour la pagination | `retstart=20` (commence au 21ème article) |
| `sort` | Ordre de tri des résultats | `sort=relevance`, `sort=pub_date` |
| `field` | Limite la recherche à un champ spécifique | `field=title` |
| `datetype` | Type de date à utiliser | `datetype=pdat` (date de publication) |
| `reldate` | Nombre de jours relatifs à aujourd'hui | `reldate=60` (60 derniers jours) |
| `mindate` | Date minimale (YYYY/MM/DD) | `mindate=2020/01/01` |
| `maxdate` | Date maximale (YYYY/MM/DD) | `maxdate=2021/12/31` |
| `usehistory` | Utiliser l'historique de session | `usehistory=y` |
| `api_key` | Clé API pour augmenter les limites | `api_key=VOTRE_CLE` |

### Champs de recherche

ESearch prend en charge de nombreux champs de recherche qui peuvent être spécifiés en utilisant la syntaxe `term[field]`:

| Tag | Description | Exemple |
|-----|-------------|---------|
| `[au]` | Auteur | `smith j[au]` |
| `[auid]` | Identifiant de l'auteur | `0000-0002-1825-0097[auid]` |
| `[affl]` | Affiliation | `harvard[affl]` |
| `[pdat]` | Date de publication | `2024/10/30[pdat]` |
| `[ti]` | Titre | `cancer[ti]` |
| `[ab]` | Résumé (abstract) | `treatment[ab]` |
| `[mesh]` | Terme MeSH | `neoplasms[mesh]` |
| `[majr]` | Terme MeSH principal | `diabetes[majr]` |
| `[jour]` | Journal | `science[jour]` |
| `[la]` | Langue | `english[la]` |
| `[pt]` | Type de publication | `review[pt]` |
| `[dp]` | Date de publication (année) | `2024[dp]` |
| `[volume]` | Volume du journal | `385[volume]` |
| `[issue]` | Numéro du journal | `6627[issue]` |
| `[page]` | Numéro de page | `724[page]` |
| `[pmid]` | ID PubMed | `37123456[pmid]` |
| `[doi]` | DOI (Digital Object Identifier) | `10.1016/j.cell.2023.01.015[doi]` |

### Opérateurs de recherche

ESearch prend en charge plusieurs opérateurs booléens pour des recherches complexes:

| Opérateur | Description | Exemple |
|-----------|-------------|---------|
| `AND` | Les deux termes doivent être présents | `cancer AND therapy` |
| `OR` | L'un des termes doit être présent | `vaccine OR immunization` |
| `NOT` | Exclut les résultats contenant le terme | `virus NOT covid` |
| `()` | Groupement d'expressions | `(cancer OR tumor) AND therapy` |
| `*` | Troncature (correspondance partielle) | `neuro*` (trouve neurologie, neuroscience, etc.) |
| `""` | Phrase exacte | `"breast cancer"` |

### Exemples de requêtes

1. Recherche simple d'articles sur le cancer

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=cancer&retmode=json
```

2. Recherche d'articles publiés à une date précise

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=2024/10/30[pdat]&retmode=json
```

3. Recherche d'articles d'un auteur spécifique sur un sujet

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=smith+j[au]+AND+covid-19&retmode=json
```

4. Recherche d'articles récents (30 derniers jours) sur un sujet

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=diabetes&reldate=30&datetype=pdat&retmode=json
```

5. Recherche d'articles de revue sur un sujet (2020-2024)

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=alzheimer+AND+review[pt]&mindate=2020&maxdate=2024&datetype=pdat&retmode=json
```

6. Recherche avec pagination (résultats 21-40)

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=immunotherapy&retstart=20&retmax=20&retmode=json
```

7. Recherche d'articles contenant des termes spécifiques dans le titre et l'abstract

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=cancer[ti]+AND+treatment[ab]&retmode=json
```

8. Recherche d'articles sur un terme MeSH spécifique

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=neoplasms[mesh]&retmode=json
```

### Utilisation de l'historique de session (WebEnv)

L'utilisation de `usehistory=y` permet de stocker les résultats de la recherche sur le serveur NCBI pour une utilisation ultérieure. Cela est particulièrement utile pour les recherches volumineuses ou pour enchaîner plusieurs requêtes:

Exemple de requête avec historique:

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=cancer&usehistory=y&retmode=json
```

Result:

```json
{
  "esearchresult": {
    "count": "12345",
    "retmax": "20",
    "retstart": "0",
    "querykey": "1",
    "webenv": "MCID_6486a85c7b85633351b8e22d",
    "idlist": [
      "37123456",
      "37123455",
      "..."
    ]
  }
}
```

Cs valeurs `querykey` et `webenv` peuvent être utilisées dans des requêtes ultérieures pour référencer les résultats:

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&query_key=1&WebEnv=MCID_6486a85c7b85633351b8e22d&retmode=xml
```

### Limites de l'API

1. Limites de requêtes:

- 3 par seconde pour les utilisateurs anonymes
- 10 par seconde pour les utilisateurs authentifiés (avec clé API)

2. Dans notre cas, comme on veut crawl toute l'api il nou demande de faire ce genre de traitemment lourd pour pas ce faire ban en heure creuse:

- entre 21h et 5h du matin

### Dinguerie à faire avec l'historique

Il possible d'utiliser les result de recherche afin de créer des workflow de recherche.

#### Exemple de workflow

1. Recherche d'articles sur le cancer

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=cancer&usehistory=y&retmode=json
```

2. Récuperer les Abstract des articles trouvés

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&query_key=1&WebEnv=MCID_6486a85c7b85633351b8e22d&retmode=xml&rettype=abstract
```

### Documentation officielle

- [Documentation E-Utilities](https://www.ncbi.nlm.nih.gov/books/NBK25500/) // ne pas y aller
- [Documentation ESearch](https://www.ncbi.nlm.nih.gov/books/NBK25499/#chapter4.ESearch) // ici non plus
- [clé API](https://account.ncbi.nlm.nih.gov/settings/) // se créer un compte et générer une clé
- [Home PubMed API](https://www.ncbi.nlm.nih.gov/myncbi/) // ici on retouve tous mais il faut un compte

## EFetch

L'API EFetch permet de récupérer les enregistrements complets à partir des identifiants d'articles obtenus via ESearch. Elle fournit les données détaillées des articles dans divers formats.

### Exemple basique

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=37123456&retmode=xml
```

Result (extrait):

```xml
<PubmedArticleSet>
  <PubmedArticle>
    <MedlineCitation Status="Publisher" Owner="NLM">
      <PMID Version="1">37123456</PMID>
      <DateRevised>
        <Year>2023</Year>
        <Month>03</Month>
        <Day>21</Day>
      </DateRevised>
      <Article PubModel="Print-Electronic">
        <Journal>
          <ISSN IssnType="Electronic">1476-4687</ISSN>
          <JournalIssue CitedMedium="Internet">
            <Volume>615</Volume>
            <Issue>7952</Issue>
            <PubDate>
              <Year>2023</Year>
              <Month>Mar</Month>
              <Day>16</Day>
            </PubDate>
          </JournalIssue>
          <Title>Nature</Title>
          <ISOAbbreviation>Nature</ISOAbbreviation>
        </Journal>
        <ArticleTitle>Titre de l'article scientifique</ArticleTitle>
        <Pagination>
          <MedlinePgn>468-474</MedlinePgn>
        </Pagination>
        <Abstract>
          <AbstractText>Contenu du résumé de l'article...</AbstractText>
        </Abstract>
        <!-- ... autres informations ... -->
      </Article>
    </MedlineCitation>
  </PubmedArticle>
</PubmedArticleSet>
```

### Paramètres principaux

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| `db` | Base de données à interroger (obligatoire) | `db=pubmed` |
| `id` | Identifiant(s) PubMed (obligatoire si WebEnv non utilisé) | `id=37123456` ou `id=37123456,37123457` |
| `retmode` | Format de retour | `retmode=xml` ou `retmode=json` |
| `rettype` | Type de contenu à retourner | `rettype=abstract`, `rettype=full` |
| `query_key` | Clé de requête issue d'ESearch avec usehistory | `query_key=1` |
| `WebEnv` | Identifiant WebEnv issu d'ESearch avec usehistory | `WebEnv=MCID_6486a85c7b85633351b8e22d` |
| `retstart` | Index de départ pour la pagination | `retstart=20` |
| `retmax` | Nombre maximum de résultats à retourner | `retmax=100` (défaut: 20) |
| `api_key` | Clé API pour augmenter les limites | `api_key=VOTRE_CLE` |

### Types de retour (rettype)

EFetch prend en charge plusieurs formats de retour via le paramètre `rettype`:

| rettype | Description |
|---------|-------------|
| `abstract` | Résumé formaté avec titre, auteurs, journal, résumé |
| `full` | Article complet avec toutes les informations disponibles |
| `medline` | Format MEDLINE (texte) |
| `xml` | Format XML complet (par défaut) |
| `uilist` | Liste d'UIDs uniquement |
| `docsum` | Résumé du document |

### Exemples de requêtes

1. Récupération d'un article spécifique par ID

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=37123456&retmode=xml
```

2. Récupération de plusieurs articles par ID

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=37123456,37123457,37123458&retmode=xml
```

3. Récupération d'articles en format résumé

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=37123456&retmode=xml&rettype=abstract
```

4. Récupération d'articles à partir de résultats stockés dans WebEnv

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&query_key=1&WebEnv=MCID_6486a85c7b85633351b8e22d&retmode=xml&retmax=10
```

5. Récupération d'articles avec pagination (résultats 11-20)

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&query_key=1&WebEnv=MCID_6486a85c7b85633351b8e22d&retmode=xml&retstart=10&retmax=10
```

### Structure des données XML retournées

Les données XML retournées par EFetch pour PubMed contiennent généralement les éléments suivants:

- `<PubmedArticleSet>` - Conteneur principal
  - `<PubmedArticle>` - Information sur un article
    - `<MedlineCitation>` - Données de citation
      - `<PMID>` - Identifiant PubMed
      - `<DateCreated>` - Date de création
      - `<Article>` - Données de l'article
        - `<Journal>` - Information sur le journal
        - `<ArticleTitle>` - Titre de l'article
        - `<Abstract>` - Résumé
        - `<AuthorList>` - Liste des auteurs
      - `<MeshHeadingList>` - Termes MeSH
    - `<PubmedData>` - Métadonnées PubMed
      - `<History>` - Historique des dates
      - `<PublicationStatus>` - Statut de publication
      - `<ArticleIdList>` - Liste des identifiants (DOI, PMID, etc.)

### Utilisation avec ESearch dans un workflow

EFetch est généralement utilisé après ESearch pour récupérer les informations complètes des articles identifiés. Voici un exemple de workflow complet:

1. Recherche d'articles sur un sujet avec ESearch

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=diabetes+treatment&usehistory=y&retmode=json
```

Result:

```json
{
  "esearchresult": {
    "count": "123456",
    "retmax": "20",
    "retstart": "0",
    "querykey": "1",
    "webenv": "MCID_6486a85c7b85633351b8e22d",
    "idlist": [
      "37123456",
      "37123455",
      "..."
    ]
  }
}
```

2. Récupération des articles complets avec EFetch

```url
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&query_key=1&WebEnv=MCID_6486a85c7b85633351b8e22d&retmode=xml&retmax=10
```

### Bonne pratiques

- Spécifiez uniquement les champs dont vous avez besoin via `rettype`
- Utilisez la compression (`gzip`) si disponible
- Mettez en cache les résultats fréquemment consultés (result de ESearch)
