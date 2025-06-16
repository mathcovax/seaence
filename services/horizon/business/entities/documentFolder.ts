import { zod } from "@vendors/clean";

export namespace DocumentFolder {

	export const index = zod.object({
		id: zod.string(),
		userId: zod.string(),
		name: zod.string(),
		numberOfDocument: zod.number(),
		createdAt: zod.string(),
	});

	export const list = zod.object({
		list: index.array(),
		total: zod.number(),
	});

	export const page = zod.object({
		total: zod.number(),
		quantityPerPage: zod.number(),
	});
}

