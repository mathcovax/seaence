import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { documentFolderIdObjecter } from "./documentFolder";

export const documentIdObjecter = zod.string().createValueObjecter("documentId");
export type DocumentId = GetValueObject<typeof documentIdObjecter>;

export const documentTitleObjecter = zod.string().createValueObjecter("documentInFolderTitle");
export type DocumentTitle = GetValueObject<typeof documentTitleObjecter>;

export const documentSummaryObjecter = zod.string().createValueObjecter("documentInFolderSummary");
export type DocumentSummary = GetValueObject<typeof documentSummaryObjecter>;

export class DocumentInFolderEntity extends EntityHandler.create({
	documentFolderId: documentFolderIdObjecter,
	id: documentIdObjecter,
	title: documentTitleObjecter,
	summary: documentSummaryObjecter,
}) {
	public static create(params: GetEntityProperties<typeof DocumentInFolderEntity>) {
		return new DocumentInFolderEntity(params);
	}
}

export const documentInFolderEntityObjecter = EntityHandler.createEntityObjecter("documentInFolder", DocumentInFolderEntity);
export type DocumentInFolder = GetValueObject<typeof documentInFolderEntityObjecter>;
