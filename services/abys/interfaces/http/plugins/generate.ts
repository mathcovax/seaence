import { articleTypeObjecter } from "@business/domains/common/articleType";
import { uniqueFieldObjecter } from "@business/domains/common/uniqueField";
import "@duplojs/types-codegen";

articleTypeObjecter.zodSchema._zttIdentifier = "ArticleType";

uniqueFieldObjecter.zodSchema.shape.name._zttIdentifier = "UniqueFieldName";
