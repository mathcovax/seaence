import { EntityHandler, type GetValueObject, type GetEntityProperties, zod } from "@vendors/clean";
import { MissionEntity, missionStatusObjecter } from ".";
import { articleTypeObjecter } from "@business/domains/common/articleType";

export const publishDateSearchedObjecter = zod
	.string()
	.createValueObjecter("publishDateSearched");

export type PublishDateSearched = GetValueObject<typeof publishDateSearchedObjecter>;

export class SearchResultMissionEntity extends EntityHandler.create(
	{
		articleType: articleTypeObjecter,
		publishDateSearched: publishDateSearchedObjecter,
	},
	MissionEntity,
) {
	public static create(
		params: Omit<GetEntityProperties<SearchResultMissionEntity>, "status">,
	) {
		return new SearchResultMissionEntity({
			...params,
			status: missionStatusObjecter.unsafeCreate("inQueue"),
		});
	}
}
