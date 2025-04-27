### start container
```bash
npm run docker:marine-snow
```

### apply migration
```bash
npm run docker:marine-snow:prisma:apply-migration
```

### make migration
```bash
npm run docker:marine-snow:prisma:make-migration
```

### run studio
```bash
npm run docker:marine-snow:prisma:studio
```

### start search result mission
```bash
npm run docker:marine-snow:mission:searchResult -- -p pubmed -a metaAnalysis -t 2022/09/13 -f 2022/09/13
# 48 search result

npm run docker:marine-snow:mission:resumeSearchResult -- --id [missionId]

npm run docker:marine-snow:mission:sendSearchResult
```