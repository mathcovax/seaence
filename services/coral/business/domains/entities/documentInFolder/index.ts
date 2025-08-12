import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { documentFolderIdObjecter } from "../documentFolder";
import { documentInFolderRules } from "@vendors/entity-rules";
import { userIdObjecter } from "@business/domains/common/user";

export const nodeSameRawDocumentIdObjecter = zod.string().createValueObjecter("nodeSameRawDocumentId");

export type NodeSameRawDocumentId = GetValueObject<typeof nodeSameRawDocumentIdObjecter>;

export const documentInFolderNameObjecter = zod
	.string()
	.min(documentInFolderRules.name.minLength)
	.max(documentInFolderRules.name.maxLength)
	.createValueObjecter("documentInFolderName");

export type DocumentInFolderName = GetValueObject<typeof documentInFolderNameObjecter>;

export class DocumentInFolderEntity extends EntityHandler.create({
	name: documentInFolderNameObjecter,
	documentFolderId: documentFolderIdObjecter,
	userId: userIdObjecter,
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

	public rename(name: DocumentInFolderName) {
		return this.update({
			name,
		});
	}
}
