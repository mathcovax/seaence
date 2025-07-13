import { type GetValueObject, zod } from "@vendors/clean";

export const nodeSameRawDocumentIdObjecter = zod
	.string()
	.createValueObjecter("nodeSameRawDocumentId");

export type NodeSameRawDocumentId = GetValueObject<typeof nodeSameRawDocumentIdObjecter>;
