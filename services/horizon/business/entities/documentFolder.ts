import { zod } from "@vendors/clean";

export namespace DocumentFolder {

	export const index = zod.object({
		id: zod.string(),
		userId: zod.string(),
		name: zod.string(),
		numberOfDocument: zod.number(),
		createdAt: zod.string(),
	});

	export const details = zod.object({
		total: zod.number(),
	});

	export const list = index.array();

	export const page = zod.object({
		total: zod.number(),
		quantityPerPage: zod.number(),
	});

	export const dialog = zod.object({
		quantityPerPage: zod.number(),
	});
}

