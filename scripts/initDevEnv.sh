#!/usr/bin/env bash

set -euo pipefail

npm run docker:marine-snow:prisma:apply-migration
npm run docker:harbor:prisma:apply-migration
npm run docker:marine-snow:mission:fetchArticleReference:pubmed -- -a metaAnalysis -t 2022/09/13 -f 2022/09/13
npm run docker:marine-snow:mission:exportManyArticleReference -- --concurrency 5
npm run docker:abys:transformeUpdatedNodeSameRawDocumentsToBakedDocuments
npm run docker:abys:indexUpdatedBakedDocuments