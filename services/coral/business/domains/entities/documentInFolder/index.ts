import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { documentFolderIdObjecter } from "../documentFolder";

export const nodeSameRawDocumentIdObjecter = zod.string().createValueObjecter("nodeSameRawDocumentId");

export type NodeSameRawDocumentId = GetValueObject<typeof nodeSameRawDocumentIdObjecter>;

export const documentInFolderNameObjecter = zod.string().createValueObjecter("documentInFolderName");

export type DocumentInFolderName = GetValueObject<typeof documentInFolderNameObjecter>;

export class DocumentInFolderEntity extends EntityHandler.create({
	name: documentInFolderNameObjecter,
	documentFolderId: documentFolderIdObjecter,
	nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter,
	addedAt: commonDateObjecter,
}) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof DocumentInFolderEntity>,
			"addedAt"
		>,
	) {
		return new DocumentInFolderEntity({
			...params,
			addedAt: commonDateObjecter.unsafeCreate(new Date()),
		});
	}
}
