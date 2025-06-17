import type { ExpectType } from "@duplojs/utils";
import { createEnum, type GetEnumValue } from "@vendors/clean";
import type { UserLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

export const userLanguageEnum = createEnum([
	"fr-FR",
	"en-US",
]);

type _ExpectArticleTypeHasAllValues = ExpectType<
	GetEnumValue<typeof userLanguageEnum>,
	UserLanguage,
	"strict"
>;

export const userLanguageSchema = zod.enum(
	userLanguageEnum.toTuple(),
);
