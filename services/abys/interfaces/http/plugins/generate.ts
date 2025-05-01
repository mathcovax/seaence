import { abstractSectionNameObjecter } from "@business/domains/common/abtrasctSection";
import { articleTypeObjecter } from "@business/domains/common/articleType";
import { uniqueFieldObjecter } from "@business/domains/common/uniqueField";
import "@duplojs/types-codegen";

abstractSectionNameObjecter.zodSchema._zttIdentifier = "AbstractSectionName";

articleTypeObjecter.zodSchema._zttIdentifier = "ArticleType";

uniqueFieldObjecter.zodSchema.shape.name._zttIdentifier = "UniqueFieldName";
