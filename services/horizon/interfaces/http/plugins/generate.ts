import { bakedDocumentLanguageObjecter } from "@business/entities/bakedDocument";
import { bakedDocumentSearchResultObjecter } from "@business/entities/bakedDocumentSearchResult";
import { articleTypeObjecter } from "@business/entities/common/articleType";
import { facetObjecter } from "@business/entities/facets";

articleTypeObjecter.zodSchema._zttIdentifier = "ArticleType";

bakedDocumentLanguageObjecter.zodSchema._zttIdentifier = "BakedDocumentLanguage";

bakedDocumentSearchResultObjecter.zodSchema._zttIdentifier = "bakedDocumentSearchResult";

facetObjecter.zodSchema._zttIdentifier = "Facet";

