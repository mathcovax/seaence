import { articleTypeObjecter } from "@business/domains/common/articleType";
import { uniqueFieldObjecter } from "@business/domains/common/uniqueField";
import { bakedDocumentLanguageObjecter } from "@business/domains/entities/bakedDocument";
import "@duplojs/types-codegen";

bakedDocumentLanguageObjecter.zodSchema._zttIdentifier = "Language";

articleTypeObjecter.zodSchema._zttIdentifier = "ArticleType";

uniqueFieldObjecter.zodSchema.shape.name._zttIdentifier = "UniqueFieldName";
