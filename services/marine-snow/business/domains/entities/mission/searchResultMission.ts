import { EntityHandler, type GetValueObject, type GetEntityProperties, zod } from "@vendors/clean";
import { MissionEntity, missionStatusObjecter } from ".";
import { articleTypeObjecter } from "@business/domains/common/articleType";

export const publishDateSearchedObjecter = zod
	.date()
	.createValueObjecter("publishDateSearched");

export const searchResultMissionNameObjecter = zod
	.literal("searchResult")
	.createValueObjecter("searchResultMissionName");

export type PublishDateSearched = GetValueObject<typeof publishDateSearchedObjecter>;

export class SearchResultMissionEntity extends EntityHandler.create(
	{
		name: searchResultMissionNameObjecter,
		articleType: articleTypeObjecter,
		publishDateSearched: publishDateSearchedObjecter,
	},
	MissionEntity,
) {
	public static create(
		params: Omit<GetEntityProperties<SearchResultMissionEntity>, "status" | "name">,
	) {
		return new SearchResultMissionEntity({
			...params,
			name: searchResultMissionNameObjecter.unsafeCreate("searchResult"),
			status: missionStatusObjecter.unsafeCreate("inQueue"),
		});
	}
}
