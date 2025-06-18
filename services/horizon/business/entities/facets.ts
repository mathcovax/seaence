import { createEnum, zod } from "@vendors/clean";
import { ArticleType } from "./common/articleType";

export namespace Facet {
	export const typeEnum = createEnum([
		"checkbox",
		"multiSelect",
		"range",
	]);

	export const gendeValueEnum = createEnum(["male", "female"]);

	export const genderValue = zod
		.enum(gendeValueEnum.toTuple());

	export const gender = zod
		.object({
			type: zod.literal(typeEnum.checkbox),
			name: zod.literal("gender"),
			values: zod.object({
				value: genderValue,
				quantity: zod.number(),
			}).array(),
		});

	export const speciesValueEnum = createEnum(["human", "otherAnimal"]);

	export const speciesValue = zod
		.enum(speciesValueEnum.toTuple());

	export const species = zod
		.object({
			type: zod.literal(typeEnum.checkbox),
			name: zod.literal("species"),
			values: zod.object({
				value: speciesValue,
				quantity: zod.number(),
			}).array(),
		});

	export const articleType = zod
		.object({
			type: zod.literal(typeEnum.multiSelect),
			name: zod.literal("articleType"),
			values: zod.object({
				value: ArticleType.index,
				quantity: zod.number(),
			}).array(),
		});

	export const yearValue = zod.number();

	export const year = zod
		.object({
			type: zod.literal(typeEnum.range),
			name: zod.literal("year"),
			values: zod.object({
				value: yearValue,
				quantity: zod.number(),
			}).array(),
		});

	export const index = zod
		.union([
			articleType,
			gender,
			species,
			year,
		]);

	export type Index = typeof index["_output"];

	export const filters = zod.object({
		articleType: ArticleType.index.array().optional(),
		gender: genderValue.array().optional(),
		species: speciesValue.array().optional(),
		year: zod.object({
			from: yearValue,
			to: yearValue,
		}).optional(),
	});

	export const searchDetails = zod.object({
		total: zod.number(),
		facets: index.array(),
		quantityPerPage: zod.number(),
	});
}
