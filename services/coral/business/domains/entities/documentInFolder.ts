import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { documentFolderIdObjecter } from "./documentFolder";

export const documentIdObjecter = zod.string().createValueObjecter("documentId");
export type DocumentId = GetValueObject<typeof documentIdObjecter>;

export const documentInFolderTitleObjecter = zod.string().createValueObjecter("documentInFolderTitle");
export type DocumentInFolderTitle = GetValueObject<typeof documentInFolderTitleObjecter>;

export const documentInFolderSummaryObjecter = zod.string().createValueObjecter("documentInFolderSummary");
export type DocumentInFolderSummary = GetValueObject<typeof documentInFolderSummaryObjecter>;

export class DocumentInFolderEntity extends EntityHandler.create({
	documentFolderId: documentFolderIdObjecter,
	id: documentIdObjecter,
	title: documentInFolderTitleObjecter,
	summary: documentInFolderSummaryObjecter,
}) {
	public static create(params: GetEntityProperties<typeof DocumentInFolderEntity>) {
		return new DocumentInFolderEntity(params);
	}
}

export const documentInFolderEntityObjecter = EntityHandler.createEntityObjecter("documentInFolder", DocumentInFolderEntity);
export type DocumentInFolder = GetValueObject<typeof documentInFolderEntityObjecter>;
