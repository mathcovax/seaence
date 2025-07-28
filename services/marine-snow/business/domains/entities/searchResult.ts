import { EntityHandler, type GetValueObject, zod, type GetEntityProperties } from "@vendors/clean";
import { providerObjecter } from "../common/provider";

export const searchResultReferenceObjecter = zod
	.string()
	.createValueObjecter("searchResultReference");

export type SearchResultReference = GetValueObject<typeof searchResultReferenceObjecter>;

export const searchResultFailedToSendObjecter = zod
	.boolean()
	.createValueObjecter("searchResultFailedToSend");

export class SearchResultEntity extends EntityHandler.create({
	provider: providerObjecter,
	reference: searchResultReferenceObjecter,
	failedToSend: searchResultFailedToSendObjecter,
}) {
	public static create(params: Omit<GetEntityProperties<typeof SearchResultEntity>, "status" | "failedToSend">) {
		return new SearchResultEntity({
			...params,
			failedToSend: searchResultFailedToSendObjecter.unsafeCreate(false),
		});
	}
}
