### start container
```bash
npm run docker:marine-snow
```

### run migration
```bash
npm run docker:marine-snow:prisma:migrate
```

### run studio
```bash
npm run docker:marine-snow:prisma:studio
```

### start search result mission
```bash
npm run docker:marine-snow:mission:launch -- -p pubmed -a metaAnalysis -t 2022/09/13 -f 2022/09/13
```