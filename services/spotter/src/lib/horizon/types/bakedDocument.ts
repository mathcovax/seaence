import type { UnionToTuple } from "@duplojs/utils";
import { createEnum } from "@vendors/clean";
import type { BakedDocumentLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

export const bakedDocumentLanguageEnum = createEnum<
	BakedDocumentLanguage,
	UnionToTuple<BakedDocumentLanguage>
>([
	"fr-FR",
	"en-US",
]);

export const bakedDocumentLanguageSchema = zod.enum(
	bakedDocumentLanguageEnum.toTuple(),
);
