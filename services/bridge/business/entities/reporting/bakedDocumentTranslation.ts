import { zod } from "@vendors/clean";
import { BakedDocument } from "../bakedDocument";

export namespace ReportingBakedDocumentTranslation {
	export const aggregateListRow = zod
		.object({
			bakedDocumentTitle: zod.string(),
			bakedDocumentId: zod.string(),
			reportingQuantity: zod.number(),
		});

	export const aggregateList = aggregateListRow.array();

	export const listPage = zod
		.object({
			countTotal: zod.number(),
			quantityPerPage: zod.number(),
		});

	export const listRow = zod.object({
		id: zod.string(),
		userId: zod.string(),
		bakedDocumentId: zod.string(),
		details: zod.string(),
	});

	export const list = listRow.array();

	export const page = zod.object({
		bakedDocument: BakedDocument.index,
		reporting: zod.object({
			countTotal: zod.number(),
			quantityPerPage: zod.number(),
		}),
	});
}
