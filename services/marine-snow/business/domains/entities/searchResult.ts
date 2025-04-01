import { createEnum, EntityHandler, zod, type GetEntityProperties } from "@vendors/clean";
import { providerObjecter } from "../common/provider";

export const searchResultReferenceObjecter = zod
	.string()
	.createValueObjecter("searchResultReference");

export const searchResultStatusEnum = createEnum([
	"find",
	"selectedToBeSent",
	"failedToSend",
]);

export const searchResultStatusObjecter = zod
	.enum(searchResultStatusEnum.toTuple())
	.createValueObjecter("searchResultStatus");

export class SearchResultEntity extends EntityHandler.create({
	provider: providerObjecter,
	reference: searchResultReferenceObjecter,
	status: searchResultStatusObjecter,
}) {
	public static create(params: Omit<GetEntityProperties<typeof SearchResultEntity>, "status">) {
		return new SearchResultEntity({
			...params,
			status: searchResultStatusObjecter.unsafeCreate("find"),
		});
	}

	public failed() {
		return this.update({
			status: searchResultStatusObjecter.unsafeCreate("failedToSend"),
		});
	}
}
