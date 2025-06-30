import { createEnum, type GetEnumValue, zod } from "@vendors/clean";

export namespace Translate {
	const languageEnum = createEnum([
		"fr-FR",
		"en-US",
	]);

	export type Language = GetEnumValue<typeof languageEnum>;

	export const language = zod
		.enum(languageEnum.toTuple());

	const providerEnum = createEnum([
		"default",
		"googleScrape",
		"libretranslate",
	]);

	export const provider = zod
		.enum(providerEnum.toTuple());
}
