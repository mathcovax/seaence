import { bakedDocumentLanguageObjecter } from "@business/entities/bakedDocument";
import { bakedDocumentSearchResultObjecter } from "@business/entities/bakedDocumentSearchResult";
import { articleTypeObjecter } from "@business/entities/common/articleType";
import { facetObjecter, genderFacetValueObjecter, speciesFacetValueObjecter } from "@business/entities/facets";
import { filtersValuesSchema } from "../schemas/search/filter";
import { comparatorTextSchema, comparatorYearSchema, operatorAndSchema, operatorContentSchema, operatorNotSchema, operatorOrSchema } from "@vendors/types-advanced-query";

articleTypeObjecter.zodSchema._zttIdentifier = "ArticleType";

bakedDocumentLanguageObjecter.zodSchema._zttIdentifier = "BakedDocumentLanguage";

bakedDocumentSearchResultObjecter.zodSchema._zttIdentifier = "BakedDocumentSearchResult";

facetObjecter.zodSchema._zttIdentifier = "Facet";

filtersValuesSchema._zttIdentifier = "FiltersValues";

genderFacetValueObjecter.zodSchema._zttIdentifier = "GenderFacetValue";

speciesFacetValueObjecter.zodSchema._zttIdentifier = "SpeciesFacetValue";

comparatorYearSchema._zttIdentifier = "ComparatorYear";
comparatorTextSchema._zttIdentifier = "ComparatorText";
operatorContentSchema._zttIdentifier = "OperatorContent";
operatorAndSchema._zttIdentifier = "OperatorAnd";
operatorOrSchema._zttIdentifier = "OperatorOR";
operatorNotSchema._zttIdentifier = "OperatorNot";

