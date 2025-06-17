import "@duplojs/types-codegen";
import "@vendors/types-advanced-query/generate";
import { bakedDocumentLanguageObjecter, bakedDocumentObjecter } from "@business/entities/bakedDocument";
import { bakedDocumentSearchResultObjecter } from "@business/entities/bakedDocumentSearchResult";
import { articleTypeObjecter } from "@business/entities/common/articleType";
import { facetObjecter, genderFacetValueObjecter, speciesFacetValueObjecter } from "@business/entities/facets";
import { filtersValuesSchema } from "../schemas/search/filter";
import { flexibleDateObjecter } from "@vendors/clean";
import { postObjecter } from "@business/entities/post";
import { answerObjecter } from "@business/entities/answer";
import { userLanguageObjecter, userObjecter } from "@business/entities/user";
import { notificationObjecter, replyToPostNotificationObjecter, registerNotificationObjecter } from "@business/entities/notification";
import { FavoriteEquation } from "@business/entities/favoriteEquation";

articleTypeObjecter.zodSchema._zttIdentifier = "ArticleType";

bakedDocumentObjecter.zodSchema._zttIdentifier = "BakedDocument";

bakedDocumentLanguageObjecter.zodSchema._zttIdentifier = "BakedDocumentLanguage";

bakedDocumentSearchResultObjecter.zodSchema._zttIdentifier = "BakedDocumentSearchResult";

facetObjecter.zodSchema._zttIdentifier = "Facet";

filtersValuesSchema._zttIdentifier = "FiltersValues";

genderFacetValueObjecter.zodSchema._zttIdentifier = "GenderFacetValue";

speciesFacetValueObjecter.zodSchema._zttIdentifier = "SpeciesFacetValue";

flexibleDateObjecter.zodSchema._zttIdentifier = "FlexibleDate";

postObjecter.zodSchema._zttIdentifier = "Post";
answerObjecter.zodSchema._zttIdentifier = "Answer";

userObjecter.zodSchema._zttIdentifier = "User";
userLanguageObjecter.zodSchema._zttIdentifier = "UserLanguage";

notificationObjecter.zodSchema._zttIdentifier = "Notification";

replyToPostNotificationObjecter.zodSchema._zttIdentifier = "ReplyToPostNotification";

registerNotificationObjecter.zodSchema._zttIdentifier = "RegisterNotification";

FavoriteEquation.index._zttIdentifier = "FavoriteEquation";
FavoriteEquation.listDetails._zttIdentifier = "FavoriteEquationListDetails";
