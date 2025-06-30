import { createEnum, zod } from "@vendors/clean";

export namespace BakedDocument {
	const languageEnum = createEnum(["fr-FR", "en-US"]);

	export const language = zod.enum(languageEnum.toTuple());

	const cookingModeEnum = createEnum(["default", "libretranslate", "googleScrape"]);

	export const cookingMode = zod.enum(cookingModeEnum.toTuple());

	export const index = zod.object({
		id: zod.string(),
		cookingMode,
		nodeSameRawDocumentId: zod.string(),
		language,
		title: zod.string(),
		abstract: zod.string().nullable(),
		abstractDetails: zod
			.object({
				name: zod.string(),
				label: zod.string(),
				content: zod.string(),
			})
			.array()
			.nullable(),
		keywords: zod.string().array(),
	});

	export const newTranslation = index.pick({
		cookingMode: true,
		title: true,
		abstract: true,
		abstractDetails: true,
		keywords: true,
	});
}
