import { dateYYYYMMDDObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { documentFolderIdObjecter } from "../documentFolder";

export const documentIdObjecter = zod.string().createValueObjecter("documentId");
export type DocumentId = GetValueObject<typeof documentIdObjecter>;

export const documentTitleObjecter = zod.string().createValueObjecter("documentInFolderTitle");
export type DocumentTitle = GetValueObject<typeof documentTitleObjecter>;

export class DocumentInFolderEntity extends EntityHandler.create({
	documentFolderId: documentFolderIdObjecter,
	id: documentIdObjecter,
	title: documentTitleObjecter,
	addedAt: dateYYYYMMDDObjecter,
}) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof DocumentInFolderEntity>,
			"addedAt"
		>,
	) {
		return new DocumentInFolderEntity({
			...params,
			addedAt: dateYYYYMMDDObjecter.unsafeCreate(new Date()),
		});
	}

	public renameDocumentInFolder(
		newTitle: DocumentTitle,
	) {
		return this.update({
			title: newTitle,
		});
	}
}

export const documentInFolderEntityObjecter = EntityHandler.createEntityObjecter("documentInFolder", DocumentInFolderEntity);
export type DocumentInFolder = GetValueObject<typeof documentInFolderEntityObjecter>;
