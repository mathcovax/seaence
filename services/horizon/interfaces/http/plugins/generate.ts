import "@duplojs/types-codegen";
import "@vendors/types-advanced-query/generate";
import { BackedDocument } from "@business/entities/bakedDocument";
import { ArticleType } from "@business/entities/common/articleType";
import { Facet } from "@business/entities/facets";
import { flexibleDateObjecter } from "@vendors/clean";
import { User } from "@business/entities/user";
import { Notification } from "@business/entities/notification";
import { FavoriteEquation } from "@business/entities/favoriteEquation";
import { Post } from "@business/entities/forum/post";
import { Answer } from "@business/entities/forum/answer";

ArticleType.index._zttIdentifier = "ArticleType";

BackedDocument.index._zttIdentifier = "BakedDocument";

BackedDocument.language._zttIdentifier = "BakedDocumentLanguage";

BackedDocument.searchResult._zttIdentifier = "BakedDocumentSearchResult";

Facet.index._zttIdentifier = "Facet";

Facet.filters._zttIdentifier = "FiltersValues";

Facet.genderValue._zttIdentifier = "GenderFacetValue";

Facet.speciesValue._zttIdentifier = "SpeciesFacetValue";

flexibleDateObjecter.zodSchema._zttIdentifier = "FlexibleDate";

Post.index._zttIdentifier = "Post";
Answer.index._zttIdentifier = "Answer";

User.index._zttIdentifier = "User";
User.language._zttIdentifier = "UserLanguage";

Notification.index._zttIdentifier = "Notification";

Notification.replyToPost._zttIdentifier = "ReplyToPostNotification";

Notification.register._zttIdentifier = "RegisterNotification";

FavoriteEquation.index._zttIdentifier = "FavoriteEquation";
FavoriteEquation.listDetails._zttIdentifier = "FavoriteEquationListDetails";
