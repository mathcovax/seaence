import { zod } from "@vendors/clean";

export namespace ReportingBakedDocumentTranslation {
	export const aggregateListRow = zod
		.object({
			bakedDocumentTitle: zod.string().nullable(),
			bakedDocumentId: zod.string(),
			reportingQuantity: zod.number(),
		});

	export const aggregateList = aggregateListRow.array();

	export const listRow = zod.object({
		id: zod.string(),
		userId: zod.string(),
		bakedDocumentId: zod.string(),
		details: zod.string(),
	});

	export const list = listRow.array();
}
