import { EntityHandler, zod, type GetEntityProperties } from "@vendors/clean";
import { providerObjecter } from "../common/provider";

export const searchResultReferenceObjecter = zod
	.string()
	.createValueObjecter("searchResultReference");
export class SearchResultEntity extends EntityHandler.create({
	provider: providerObjecter,
	reference: searchResultReferenceObjecter,
}) {
	public static create(params: GetEntityProperties<typeof SearchResultEntity>) {
		return new SearchResultEntity(params);
	}
}
