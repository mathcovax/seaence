### start container
```bash
npm run docker:school
```

### run fixtures

L'option `--nodeSameRawDocumentId` est obligatoire 

```bash
npm run docker:school:fixtures -- --nodeSameRawDocumentId "0196907f-1a..."
```
**Options:**
- `-d`, `--nodeSameRawDocumentId` "0196907f-1a..." # id nodeDocument de abys (:warning: mandatory)
- `-p`, `--numberOfPost` 15 # default 10
- `-a`, `--numberOfAnswersPerPost` 40 # default 100