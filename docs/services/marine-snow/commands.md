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

### start mission
```bash
npm run docker:marine-snow:mission:fetchArticleReference:pubmed -- -a metaAnalysis -t 2022/09/13 -f 2022/09/13
# 48 search result

npm run docker:marine-snow:mission:fetchArticleReference:resume:pubmed -- --id [missionId]

npm run docker:marine-snow:mission:exportManyArticleReference -- --concurrency 5

npm run docker:marine-snow:mission:exportOneArticleReference -- --provider pubmed --reference [searchResultReference]

npm run docker:marine-snow:addOneArticleReference -- --provider pubmed --reference [searchResultReference]
```