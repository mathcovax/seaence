import { zod } from "@vendors/clean";
import { operatorContentSchema } from "@vendors/types-advanced-query";

export namespace FavoriteEquation {
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

	export const nameList = index
		.pick({
			id: true,
			name: true,
		}).array();

}
