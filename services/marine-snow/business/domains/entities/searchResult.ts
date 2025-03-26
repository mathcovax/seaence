import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { providerObjecter } from "../common/provider";
import { urlObjecter } from "../common/url";
import { articleTypeObjecter } from "../common/articleType";

export class SearchResultEntity extends EntityHandler.create({
	provider: providerObjecter,
	url: urlObjecter,
	articleType: articleTypeObjecter.nullable(),
}) {
	public static create(params: GetEntityProperties<SearchResultEntity>) {
		return new SearchResultEntity(params);
	}
}
