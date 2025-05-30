import { dateYYYYMMDDObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, type Int, intObjecter, zod } from "@vendors/clean";
import { userIdObjecter } from "../../common/user";

export const documentFolderIdObjecter = zod.string().createValueObjecter("documentFolderId");
export type DocumentFolderId = GetValueObject<typeof documentFolderIdObjecter>;

const maxSizeOfDocumentFolderTitle = 50;
const minSizeOfDocumentFolderTitle = 1;
export const documentFolderTitleObjecter = zod
	.string()
	.min(minSizeOfDocumentFolderTitle)
	.max(maxSizeOfDocumentFolderTitle)
	.createValueObjecter("documentFolderTitle");
export type DocumentFolderTitle = GetValueObject<typeof documentFolderTitleObjecter>;

const defaultNumberOfDocument = 0;

export class DocumentFolderEntity extends EntityHandler.create({
	id: documentFolderIdObjecter,
	userId: userIdObjecter,
	title: documentFolderTitleObjecter,
	numberOfDocument: intObjecter,
	createdAt: dateYYYYMMDDObjecter,
}) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof DocumentFolderEntity>,
			"numberOfDocument" | "createdAt"
		>,
	) {
		return new DocumentFolderEntity({
			...params,
			numberOfDocument: intObjecter.unsafeCreate(defaultNumberOfDocument),
			createdAt: dateYYYYMMDDObjecter.unsafeCreate(new Date()),
		});
	}

	public updateDocumentInFolderQuantity(
		numberOfDocument: Int,
	) {
		return this.update({
			numberOfDocument,
		});
	}
}
