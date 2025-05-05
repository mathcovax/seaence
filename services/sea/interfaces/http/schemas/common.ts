import { articleTypeEnum } from "@interfaces/providers/elastic/common/articleType";
import { languageEnum } from "@interfaces/providers/elastic/common/language";

export const languageSchema = zod.enum(languageEnum.toTuple());

export const articleTypeSchema = zod.enum(articleTypeEnum.toTuple());
