import { zod } from "@vendors/clean";

export namespace DocumentInFolder {

	export const index = zod.object({
		documentFolderId: zod.string(),
		nodeSameRawDocumentId: zod.string(),
		name: zod.string(),
		addedAt: zod.string(),
	});

	export const list = zod.object({
		list: index.array(),
		total: zod.number(),
	});

	export const page = zod.object({
		total: zod.number(),
		quantityPerPage: zod.number(),
		maxInFolder: zod.number(),
	});
}
