import { type GetValueObject, zod } from "@vendors/clean";

export const bakedDocumentIdObjecter = zod
	.string()
	.createValueObjecter("bakedDocumentId");

export type BakedDocumentId = GetValueObject<typeof bakedDocumentIdObjecter>;
