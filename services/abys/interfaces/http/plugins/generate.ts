import { abstractSectionNameObjecter } from "@business/domains/common/abtrasctSection";
import { articleTypeObjecter } from "@business/domains/common/articleType";
import { uniqueFieldObjecter } from "@business/domains/common/uniqueField";
import "@duplojs/types-codegen";

abstractSectionNameObjecter.zodSchema._identifier = "AbstractSectionName";

articleTypeObjecter.zodSchema._identifier = "ArticleType";

uniqueFieldObjecter.zodSchema.shape.name._identifier = "UniqueFieldName";
