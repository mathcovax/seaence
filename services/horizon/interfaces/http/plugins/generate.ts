import { bakedDocumentLanguageObjecter, bakedDocumentObjecter } from "@business/entities/bakedDocument";
import { bakedDocumentSearchResultObjecter } from "@business/entities/bakedDocumentSearchResult";
import { articleTypeObjecter } from "@business/entities/common/articleType";
import { facetObjecter, genderFacetValueObjecter, speciesFacetValueObjecter } from "@business/entities/facets";
import { filtersValuesSchema } from "../schemas/search/filter";
import { comparatorTextSchema, comparatorYearSchema, operatorAndSchema, operatorContentSchema, operatorNotSchema, operatorOrSchema } from "@vendors/types-advanced-query";
import { flexibleDateObjecter } from "@vendors/clean";
import { postObjecter } from "@business/entities/post";
import { userObjecter } from "@business/entities/user";

articleTypeObjecter.zodSchema._zttIdentifier = "ArticleType";

bakedDocumentObjecter.zodSchema._zttIdentifier = "BakedDocument";

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

flexibleDateObjecter.zodSchema._zttIdentifier = "FlexibleDate";

postObjecter.zodSchema._zttIdentifier = "Post";

userObjecter.zodSchema._zttIdentifier = "User";
