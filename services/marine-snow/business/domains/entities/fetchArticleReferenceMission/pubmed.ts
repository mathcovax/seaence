import { articleTypeObjecter } from "@business/domains/common/articleType";
import { EntityHandler, type GetValueObject, dateYYYYMMDDIntervalObjecter, dateYYYYMMDDObjecter, zod, type GetEntityProperties, type DateYYYYMMDD, type Int, createEntityKind } from "@vendors/clean";
import { FetchArticleReferenceMission, FetchArticleReferenceMissionEntity } from ".";

export namespace PubmedFetchArticleReferenceMission {
	export const currentStepObjecter = zod
		.object({
			date: dateYYYYMMDDObjecter.zodSchema,
			page: zod.number(),
		})
		.createValueObjecter("PubmedFetchArticleReferenceMissionCurrentStep");

	export type CurrentStep = GetValueObject<typeof currentStepObjecter>;
}

type PubmedFetchArticleReferenceMissionEntityCreateParams = Pick<
	GetEntityProperties<typeof PubmedFetchArticleReferenceMissionEntity>,
	| "id"
	| "articleType"
	| "interval"
>;

const {
	kind,
	kindValue,
} = createEntityKind("pubmedFetchArticleReferenceMissionEntity");

export class PubmedFetchArticleReferenceMissionEntity extends EntityHandler.create(
	{
		kind,
		articleType: articleTypeObjecter,
		interval: dateYYYYMMDDIntervalObjecter,
		currentStep: PubmedFetchArticleReferenceMission.currentStepObjecter,
	},
	FetchArticleReferenceMissionEntity,
) {
	public static create(
		params: PubmedFetchArticleReferenceMissionEntityCreateParams,
	) {
		return new PubmedFetchArticleReferenceMissionEntity({
			...params,
			kind: kindValue,
			status: FetchArticleReferenceMission
				.statusObjecter
				.unsafeCreate("created"),
			currentStep: PubmedFetchArticleReferenceMission
				.currentStepObjecter
				.unsafeCreate({
					date: params.interval.value.from,
					page: 0,
				}),
		});
	}

	public updateStep(
		date: DateYYYYMMDD,
		page: Int,
	) {
		return this.update({
			currentStep: PubmedFetchArticleReferenceMission
				.currentStepObjecter
				.unsafeCreate({
					date: date.value,
					page: page.value,
				}),
		});
	}
}
