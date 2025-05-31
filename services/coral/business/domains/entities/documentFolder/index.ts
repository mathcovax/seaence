import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, type Int, intObjecter, zod } from "@vendors/clean";
import { userIdObjecter } from "../../common/user";
import { documentFolderRules } from "@vendors/entity-rules";

export const documentFolderIdObjecter = zod.string().createValueObjecter("documentFolderId");
export type DocumentFolderId = GetValueObject<typeof documentFolderIdObjecter>;

export const documentFolderNameObjecter = zod
	.string()
	.min(documentFolderRules.name.minLength)
	.max(documentFolderRules.name.maxLength)
	.createValueObjecter("documentFolderName");

export type DocumentFolderName = GetValueObject<typeof documentFolderNameObjecter>;

const defaultNumberOfDocument = 0;

export class DocumentFolderEntity extends EntityHandler.create({
	id: documentFolderIdObjecter,
	userId: userIdObjecter,
	name: documentFolderNameObjecter,
	numberOfDocument: intObjecter,
	createdAt: commonDateObjecter,
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
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
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
