import { zod } from "@vendors/clean";
import { operatorContentSchema } from "@vendors/types-advanced-query";

export namespace FavoriteEquation {
	export const nameList = zod.string().array();

	export const listDetails = zod.object({
		total: zod.number(),
		quantityPerPage: zod.number(),
	});

	export const index = zod.object({
		id: zod.string(),
		name: zod.string(),
		userId: zod.string(),
		addedAt: zod.string(),
		equation: operatorContentSchema,
	});
}
