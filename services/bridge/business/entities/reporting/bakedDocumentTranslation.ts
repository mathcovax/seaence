import { zod } from "@vendors/clean";
import { BakedDocument } from "../bakedDocument";

export namespace ReportingBakedDocumentTranslation {
	export const listRow = zod
		.object({
			bakedDocumentTitle: zod.string(),
			bakedDocumentId: zod.string(),
			reportingQuantity: zod.number(),
		});

	export const list = listRow.array();

	export const listPage = zod
		.object({
			countTotal: zod.number(),
			quantityPerPage: zod.number(),
		});

	export const page = zod.object({
		bakedDocument: BakedDocument.index,
		reporting: zod.object({
			countTotal: zod.number(),
			quantityPerPage: zod.number(),
		}),
	});
}
