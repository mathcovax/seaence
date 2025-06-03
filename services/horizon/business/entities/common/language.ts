import { createEnum, zod } from "@vendors/clean";

export const languageEnum = createEnum(["fr-FR", "en-US"]);
export const languageObjecter = zod.enum(languageEnum.toTuple()).createValueObjecter("language");
