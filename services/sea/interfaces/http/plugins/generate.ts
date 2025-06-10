import "@duplojs/types-codegen";
import "@vendors/types-advanced-query/generate";
import { articleTypeSchema, languageSchema } from "../schemas/common";

articleTypeSchema._zttIdentifier = "ArticleType";

languageSchema._zttIdentifier = "Language";
