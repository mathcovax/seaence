import { articleTypeObjecter } from "@business/domains/common/articleType";
import { bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocumentLanguage";
import { cookingModeObjecter } from "@business/domains/common/cookingMode";
import { uniqueFieldObjecter } from "@business/domains/common/uniqueField";
import "@duplojs/types-codegen";

bakedDocumentLanguageObjecter.zodSchema._zttIdentifier = "Language";

articleTypeObjecter.zodSchema._zttIdentifier = "ArticleType";

uniqueFieldObjecter.zodSchema.shape.name._zttIdentifier = "UniqueFieldName";

cookingModeObjecter.zodSchema._zttIdentifier = "CookingMode";
