import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";

export const documentIdObjecter = zod.string().createValueObjecter("documentId");
export const documentTitleObjecter = zod.string().createValueObjecter("documentTitle");

export type DocumentId = GetValueObject<typeof documentIdObjecter>;
export type DocumentTitle = GetValueObject<typeof documentTitleObjecter>;

export class DocumentEntity extends EntityHandler.create({
	id: documentIdObjecter,
	title: documentTitleObjecter,
}) {
	public static create(params: GetEntityProperties<typeof DocumentEntity>) {
		return new DocumentEntity(params);
	}
}
