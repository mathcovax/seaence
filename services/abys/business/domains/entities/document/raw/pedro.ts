import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { RawBaseDocumentEntity } from "./base";
import { contentObjecter, methodObjecter, strutureContentObjecter } from "@business/domains/types/raw/pedro";
import { urlObjecter } from "@business/domains/types/common";

export class PedroRawDocumentEntity extends EntityHandler.create(
	{
		method: methodObjecter,
		content: contentObjecter.nullable(),
		structureContent: strutureContentObjecter.array().nullable(),
		links: urlObjecter.array(),
	},
	RawBaseDocumentEntity,
) {
	public static create(params: GetEntityProperties<typeof PedroRawDocumentEntity>) {
		return new PedroRawDocumentEntity(params);
	}
}
