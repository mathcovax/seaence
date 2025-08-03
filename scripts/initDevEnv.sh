#!/usr/bin/env sh

set -e

npm run docker:marine-snow:prisma:apply-migration
npm run docker:harbor:prisma:apply-migration
npm run docker:marine-snow:mission:searchResult -- -p pubmed -a metaAnalysis -t 2022/09/13 -f 2022/09/13
npm run docker:marine-snow:mission:sendSearchResult -- --concurrency 5
npm run docker:abys:transformeUpdatedNodeSameRawDocumentsToBakedDocuments
npm run docker:abys:indexUpdatedBakedDocuments