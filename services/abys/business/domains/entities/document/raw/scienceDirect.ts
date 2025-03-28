import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { RawBaseDocumentEntity } from "./base";

export class ScienceDirectRawDocumentEntity extends EntityHandler.create(
	{

	},
	RawBaseDocumentEntity,
) {
	public static create(params: GetEntityProperties<typeof ScienceDirectRawDocumentEntity>) {
		return new ScienceDirectRawDocumentEntity(params);
	}
}
